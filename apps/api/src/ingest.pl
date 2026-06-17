:- module(ingest, [
    sync/0,
    sync/1
]).

% Sincronização BDM/DSpace -> base dinâmica. Executada fora do caminho de
% request; após o sync, a BDM não é mais acessada.

:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(apply)).
:- use_module(library(yall)).

:- use_module(db).
:- use_module(normaliza).

base_url("https://bdm.ufpa.br/server/api").

% Coleção "Faculdade de Computação - FACOMP/ICEN": abriga CC e SI.
colecao_computacao("ed512d41-45fa-429b-948e-1d63de984274").

% Obrigatório: sem User-Agent de navegador a BDM responde HTTP 403.
user_agent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \c
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36').

tamanho_pagina(50).

% sync/0 = sincronização completa (limpa e reimporta).
sync :- sync(true).

sync(Limpar) :-
    carregar_base,
    ( Limpar == true -> limpar_base ; true ),
    colecao_computacao(Scope),
    format("Iniciando sync da coleção ~w...~n", [Scope]),
    ingerir_pagina(Scope, 0, 0, Total),
    format("Sync concluído: ~w TCCs importados.~n", [Total]).

ingerir_pagina(Scope, Page, Acc, Total) :-
    base_url(Base),
    tamanho_pagina(Size),
    format(string(Url),
        "~w/discover/search/objects?scope=~w&dsoType=item&sort=dc.date.issued,desc&page=~w&size=~w",
        [Base, Scope, Page, Size]),
    get_json(Url, Dict),
    ( objetos(Dict, Objetos), Objetos \== []
    -> foldl(ingerir_item, Objetos, Acc, Acc1),
       length(Objetos, N),
       format("  página ~w: ~w itens (acumulado ~w)~n", [Page, N, Acc1]),
       Page1 is Page + 1,
       ingerir_pagina(Scope, Page1, Acc1, Total)
    ;  Total = Acc
    ).

objetos(Dict, Objetos) :-
    get_dict('_embedded', Dict, Emb),
    get_dict(searchResult, Emb, SR),
    get_dict('_embedded', SR, Emb2),
    get_dict(objects, Emb2, Objetos).

ingerir_item(Obj, Acc, Acc1) :-
    get_dict('_embedded', Obj, E),
    get_dict(indexableObject, E, Item),
    get_dict(uuid, Item, Id),
    get_dict(metadata, Item, Meta),
    meta_first(Meta, 'dc.title', Titulo, "(sem título)"),
    meta_first(Meta, 'dc.date.issued', Issued, "0"),
    extrair_ano(Issued, Ano),
    meta_first(Meta, 'dc.identifier.citation', Citacao, ""),
    detectar_curso(Citacao, Curso),
    resumo_item(Meta, Resumo),
    ( catch(resolver_pdf(Id, PdfUrl), _, fail) -> true ; PdfUrl = "" ),
    upsert_tcc(Id, Titulo, Ano, Curso, PdfUrl, Resumo),
    meta_values(Meta, 'dc.creator', Autores),
    forall(member(A, Autores), add_autor(Id, A)),
    orientadores(Meta, Orientadores),
    forall(member(O, Orientadores), add_orientador(Id, O)),
    meta_values(Meta, 'dc.subject', Palavras),
    forall(member(P, Palavras), add_palavra_chave(Id, P)),
    Acc1 is Acc + 1.
ingerir_item(_, Acc, Acc).   % item com erro não interrompe o sync

% Orientador pode vir em advisor, advisor1 ou advisor2.
orientadores(Meta, Nomes) :-
    findall(N,
        ( member(K, ['dc.contributor.advisor',
                     'dc.contributor.advisor1',
                     'dc.contributor.advisor2']),
          meta_values(Meta, K, Vs),
          member(N, Vs)
        ),
        Nomes).

resumo_item(Meta, Resumo) :-
    ( meta_first0(Meta, 'dc.description.resumo', R) -> Resumo = R
    ; meta_first0(Meta, 'dc.description.abstract', R) -> Resumo = R
    ; Resumo = ""
    ).

% PDF: bundle "ORIGINAL" -> primeiro bitstream -> link de conteúdo.
resolver_pdf(ItemId, ContentUrl) :-
    base_url(Base),
    format(string(U1), "~w/core/items/~w/bundles", [Base, ItemId]),
    get_json(U1, D1),
    get_dict('_embedded', D1, E1),
    get_dict(bundles, E1, Bundles),
    member(B, Bundles), get_dict(name, B, "ORIGINAL"), get_dict(uuid, B, BundleId), !,
    format(string(U2), "~w/core/bundles/~w/bitstreams", [Base, BundleId]),
    get_json(U2, D2),
    get_dict('_embedded', D2, E2),
    get_dict(bitstreams, E2, [Bit|_]),
    get_dict('_links', Bit, Links),
    get_dict(content, Links, Content),
    get_dict(href, Content, ContentUrl).

% Até 3 tentativas; timeouts de rede não abortam o sync.
get_json(Url, Dict) :-
    get_json(Url, Dict, 3).

get_json(Url, Dict, Tentativas) :-
    user_agent(UA),
    catch(
        setup_call_cleanup(
            http_open(Url, In, [request_header('User-Agent'=UA),
                                request_header('Accept'='application/json'),
                                timeout(60)]),
            json_read_dict(In, Dict),
            close(In)),
        Err,
        ( Tentativas > 1
        -> T1 is Tentativas - 1,
           get_json(Url, Dict, T1)
        ;  throw(Err)
        )).

meta_values(Meta, Key, Values) :-
    ( get_dict(Key, Meta, List)
    -> maplist([E, V]>>get_dict(value, E, V), List, Values)
    ;  Values = []
    ).

meta_first0(Meta, Key, Value) :-
    meta_values(Meta, Key, [Value|_]).

meta_first(Meta, Key, Value, Default) :-
    ( meta_first0(Meta, Key, V) -> Value = V ; Value = Default ).

extrair_ano(Issued, Ano) :-
    ( sub_atom(Issued, 0, 4, _, YStr), atom_number(YStr, Ano), integer(Ano)
    -> true
    ;  Ano = 0
    ).

% Curso inferido do texto da citação (normalizado). A coleção da BDM abriga CC e
% SI; quando o texto não permite distinguir, assume-se CC (a Faculdade não tem
% curso chamado "Computação").
detectar_curso(Citacao, Curso) :-
    normaliza(Citacao, C),
    ( sub_string(C, _, _, _, "sistemas de informacao") -> Curso = "SI"
    ; sub_string(C, _, _, _, "sistema de informacao")  -> Curso = "SI"
    ; Curso = "CC"
    ).
