:- module(rules, [
    por_titulo/2,
    por_autor/2,
    por_orientador/2,
    por_periodo/3,
    por_palavra/2,
    listar_todos/1
]).

% As cinco consultas do projeto, em lógica pura sobre os fatos da base.
% Cada regra unifica Id com os TCCs correspondentes.

:- use_module(db).
:- use_module(normaliza).

por_titulo(Termo, Id) :-
    tcc(Id, Titulo, _, _, _),
    contem(Titulo, Termo).

por_autor(Termo, Id) :-
    autor(Id, Nome),
    contem(Nome, Termo).

por_orientador(Termo, Id) :-
    orientador(Id, Nome),
    contem(Nome, Termo).

por_periodo(Inicio, Fim, Id) :-
    tcc(Id, _, Ano, _, _),
    Ano >= Inicio,
    Ano =< Fim.

por_palavra(Termo, Id) :-
    palavra_chave(Id, Palavra),
    contem(Palavra, Termo).

listar_todos(Id) :-
    tcc(Id, _, _, _, _).
