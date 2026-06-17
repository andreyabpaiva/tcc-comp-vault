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
    normaliza(Termo, TermoN),
    tcc_titulo_norm(Id, TituloN),
    sub_string(TituloN, _, _, _, TermoN).

por_autor(Termo, Id) :-
    normaliza(Termo, TermoN),
    autor_norm(Id, NomeN),
    sub_string(NomeN, _, _, _, TermoN).

por_orientador(Termo, Id) :-
    normaliza(Termo, TermoN),
    orientador_norm(Id, NomeN),
    sub_string(NomeN, _, _, _, TermoN).

por_periodo(Inicio, Fim, Id) :-
    tcc(Id, _, Ano, _, _),
    Ano >= Inicio,
    Ano =< Fim.

por_palavra(Termo, Id) :-
    normaliza(Termo, TermoN),
    palavra_chave_norm(Id, PalavraN),
    sub_string(PalavraN, _, _, _, TermoN).

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
    tcc(Id, _, Ano, _, _),
    NegAno is -Ano,
    tcc_titulo_norm(Id, TituloN).
chave_ordem(antigo, Id, k(Ano, TituloN)) :-
    tcc(Id, _, Ano, _, _),
    tcc_titulo_norm(Id, TituloN).
chave_ordem(titulo, Id, TituloN) :-
    tcc_titulo_norm(Id, TituloN).
