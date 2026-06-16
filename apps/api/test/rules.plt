:- use_module('../src/normaliza').
:- use_module('../src/rules').
:- use_module('../src/serializa').
:- use_module('../src/db').

% Testes das regras sobre uma base de exemplo (não acessa a BDM nem a base
% persistida). Rodar: swipl -g run_tests -t halt apps/api/test/rules.plt

:- begin_tests(consultas).

setup_base :-
    retractall(db:tcc(_,_,_,_,_)),
    retractall(db:resumo(_,_)),
    retractall(db:autor(_,_)),
    retractall(db:orientador(_,_)),
    retractall(db:palavra_chave(_,_)),
    db:assertz(db:tcc("t1", "Detecção de Intrusão com Redes Neurais", 2023, "CC", "http://x/1")),
    db:assertz(db:tcc("t2", "Sistema de Recomendação de Filmes", 2019, "SI", "http://x/2")),
    db:assertz(db:tcc("t3", "Análise de Segurança em Aplicações Web", 2021, "CC", "http://x/3")),
    db:assertz(db:autor("t1", "Maria Sílva")),
    db:assertz(db:autor("t2", "João Souza")),
    db:assertz(db:autor("t2", "Ana Lima")),
    db:assertz(db:autor("t3", "Carlos Maria Reis")),
    db:assertz(db:orientador("t1", "Pedro Gonçalves")),
    db:assertz(db:orientador("t3", "Pedro Gonçalves")),
    db:assertz(db:palavra_chave("t1", "redes neurais")),
    db:assertz(db:palavra_chave("t3", "segurança")),
    db:assertz(db:palavra_chave("t3", "web")).

test(titulo_parcial_sem_acento, [setup(setup_base)]) :-
    findall(Id, por_titulo("deteccao", Id), Ids),
    Ids == ["t1"].

test(titulo_sem_match, [setup(setup_base)]) :-
    findall(Id, por_titulo("blockchain", Id), Ids),
    Ids == [].

test(autor_parcial, [setup(setup_base)]) :-
    findall(Id, por_autor("maria", Id), Ids),
    sort(Ids, S), S == ["t1", "t3"].

test(orientador, [setup(setup_base)]) :-
    findall(Id, por_orientador("goncalves", Id), Ids),
    sort(Ids, S), S == ["t1", "t3"].

test(periodo, [setup(setup_base)]) :-
    findall(Id, por_periodo(2020, 2023, Id), Ids),
    sort(Ids, S), S == ["t1", "t3"].

test(palavra_chave, [setup(setup_base)]) :-
    findall(Id, por_palavra("seguranca", Id), Ids),
    Ids == ["t3"].

test(listar_todos, [setup(setup_base)]) :-
    findall(Id, listar_todos(Id), Ids),
    sort(Ids, S), S == ["t1", "t2", "t3"].

test(json_monta_multivalorado, [setup(setup_base)]) :-
    tcc_json("t2", D),
    D.titulo == "Sistema de Recomendação de Filmes",
    sort(D.autores, A), A == ["Ana Lima", "João Souza"].

test(ids_json_remove_duplicatas, [setup(setup_base)]) :-
    ids_json(["t1", "t1", "t3"], Dicts),
    length(Dicts, N), N == 2.

:- end_tests(consultas).
