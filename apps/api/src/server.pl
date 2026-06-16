:- module(server, [
    iniciar/0,
    iniciar/1
]).

% Servidor HTTP/JSON. Apenas transporta: lê parâmetros, chama a regra (rules.pl)
% e serializa (serializa.pl). Não filtra nem ordena.

:- use_module(library(http/http_server)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).

:- use_module(db).
:- use_module(rules).
:- use_module(serializa).

:- set_setting_default(http:cors, [*]).

% Handler com prefixo: /api/tccs (lista) e /api/tccs/<id> (detalhe via path_info).
:- http_handler(root(api/tccs), api_tccs, [prefix]).

iniciar :- iniciar(8080).
iniciar(Port) :-
    carregar_base,
    http_server([port(Port)]),
    format("Portal de TCCs no ar em http://localhost:~w/api/tccs~n", [Port]).

api_tccs(Request) :-
    ( memberchk(path_info(Info), Request), id_de_path(Info, Id) )
    -> detalhe_tcc(Id, Request)
    ;  buscar_tccs(Request).

id_de_path(Info, Id) :-
    atom_string(Info, S),
    split_string(S, "/", "/", Partes),
    exclude(==(""), Partes, [Id|_]).

buscar_tccs(Request) :-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, [
        titulo(Titulo,         [optional(true), default('')]),
        autor(Autor,           [optional(true), default('')]),
        orientador(Orientador, [optional(true), default('')]),
        palavra(Palavra,       [optional(true), default('')]),
        inicio(Inicio,         [integer, optional(true), default(0)]),
        fim(Fim,               [integer, optional(true), default(9999)]),
        curso(Curso,           [optional(true), default('')]),
        sort(SortIn,           [optional(true), default(recente)]),
        page(Page,             [integer, optional(true), default(0)]),
        size(Size,             [integer, optional(true), default(20)])
    ]),
    sort_aceito(SortIn, Sort),
    findall(Id,
        ( consultar(Titulo, Autor, Orientador, Palavra, Inicio, Fim, Id),
          curso_ok(Curso, Id) ),
        Ids),
    ordenar(Sort, Ids, IdsOrdenados),
    ids_json(IdsOrdenados, Todos),
    paginar(Todos, Page, Size, Pagina),
    length(Todos, Total),
    reply_json_dict(_{
        total: Total,
        page: Page,
        size: Size,
        resultados: Pagina
    }).

% Seleciona uma regra por requisição, por precedência; sem critério, lista tudo.
consultar(T, _, _, _, _, _, Id)   :- T \== '',   !, por_titulo(T, Id).
consultar(_, A, _, _, _, _, Id)   :- A \== '',   !, por_autor(A, Id).
consultar(_, _, O, _, _, _, Id)   :- O \== '',   !, por_orientador(O, Id).
consultar(_, _, _, P, _, _, Id)   :- P \== '',   !, por_palavra(P, Id).
consultar(_, _, _, _, Ini, Fim, Id) :-
    ( Ini =\= 0 ; Fim =\= 9999 ), !,
    por_periodo(Ini, Fim, Id).
consultar(_, _, _, _, _, _, Id)   :- listar_todos(Id).

% Filtro de curso opcional, combinado à busca. Vazio não restringe.
curso_ok('', _) :- !.
curso_ok(Curso, Id) :-
    atom_string(Curso, CursoS),
    tcc(Id, _, _, CursoS, _).

% Valores aceitos para sort; qualquer outro recai no default.
sort_aceito(recente,     recente)     :- !.
sort_aceito(antigo,      antigo)      :- !.
sort_aceito(titulo,      titulo)      :- !.
sort_aceito(titulo_desc, titulo_desc) :- !.
sort_aceito(_,           recente).

detalhe_tcc(Id, Request) :-
    cors_enable(Request, [methods([get])]),
    ( tcc_json(Id, Dict)
    -> reply_json_dict(Dict)
    ;  reply_json_dict(_{erro: "TCC não encontrado", id: Id}, [status(404)])
    ).

paginar(Lista, Page, Size, Pagina) :-
    Offset is Page * Size,
    ( Offset >= 0, length(Prefixo, Offset), append(Prefixo, Resto, Lista)
    -> true
    ;  Resto = []
    ),
    ( length(Pagina, Size), append(Pagina, _, Resto)
    -> true
    ;  Pagina = Resto
    ).
