:- module(rules, [
    por_titulo/2,
    por_autor/2,
    por_orientador/2,
    por_periodo/3,
    por_palavra/2,
    listar_todos/1,
    ordenar/3
]).

% As cinco consultas do projeto, em lógica pura sobre os fatos da base.
% Cada regra unifica Id com os TCCs correspondentes.

:- use_module(library(pairs)).
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

% Ordenação dos resultados. A chave compara por ordem padrão de termos;
% ano negado inverte o sentido (mais recente primeiro) e título normalizado
% serve de desempate insensível a acento e caixa.
ordenar(titulo_desc, Ids, Ordenados) :- !,
    ordenar(titulo, Ids, Asc),
    reverse(Asc, Ordenados).
ordenar(Criterio, Ids, Ordenados) :-
    map_list_to_pairs(chave_ordem(Criterio), Ids, Pares),
    keysort(Pares, ParesOrdenados),
    pairs_values(ParesOrdenados, Ordenados).

chave_ordem(recente, Id, k(NegAno, TituloN)) :-
    tcc(Id, Titulo, Ano, _, _),
    NegAno is -Ano,
    normaliza(Titulo, TituloN).
chave_ordem(antigo, Id, k(Ano, TituloN)) :-
    tcc(Id, Titulo, Ano, _, _),
    normaliza(Titulo, TituloN).
chave_ordem(titulo, Id, TituloN) :-
    tcc(Id, Titulo, _, _, _),
    normaliza(Titulo, TituloN).
