:- module(serializa, [
    tcc_json/2,
    ids_json/2
]).

% Conversão dos fatos em JSON: junta os multivalorados de um mesmo Id num dict.

:- use_module(db).
:- use_module(library(apply)).

tcc_json(Id, Dict) :-
    tcc(Id, Titulo, Ano, Curso, PdfUrl),
    findall(A, autor(Id, A), Autores),
    findall(O, orientador(Id, O), Orientadores),
    findall(P, palavra_chave(Id, P), Palavras),
    ( resumo(Id, Resumo) -> true ; Resumo = "" ),
    Dict = _{
        id: Id,
        titulo: Titulo,
        ano: Ano,
        curso: Curso,
        autores: Autores,
        orientadores: Orientadores,
        palavras_chave: Palavras,
        resumo: Resumo,
        pdf_url: PdfUrl
    }.

ids_json(Ids, Dicts) :-
    list_to_ordset_stable(Ids, Unicos),
    convlist(tcc_json, Unicos, Dicts).

% Remove duplicatas preservando a ordem de primeira ocorrência.
list_to_ordset_stable(List, Unique) :-
    list_to_ordset_stable_(List, [], Unique).

list_to_ordset_stable_([], _, []).
list_to_ordset_stable_([H|T], Vistos, Out) :-
    ( memberchk(H, Vistos)
    -> list_to_ordset_stable_(T, Vistos, Out)
    ;  Out = [H|Resto],
       list_to_ordset_stable_(T, [H|Vistos], Resto)
    ).
