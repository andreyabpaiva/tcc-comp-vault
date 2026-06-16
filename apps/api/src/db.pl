:- module(db, [
    carregar_base/0,
    limpar_base/0,
    upsert_tcc/6,
    add_autor/2,
    add_orientador/2,
    add_palavra_chave/2,
    set_resumo/2,
    tcc/5,
    resumo/2,
    autor/2,
    orientador/2,
    palavra_chave/2
]).

% Base de dados dinâmica dos TCCs, persistida em data/tccs.db via
% library(persistency). Modelo relacional normalizado: multivalorados = N fatos.

:- use_module(library(persistency)).

:- persistent
    tcc(id:string, titulo:string, ano:integer, curso:string, pdf_url:string),
    resumo(id:string, texto:string),
    autor(id:string, nome:string),
    orientador(id:string, nome:string),
    palavra_chave(id:string, palavra:string).

db_file(Path) :-
    module_property(db, file(Src)),
    file_directory_name(Src, Dir),
    atomic_list_concat([Dir, '/../data/tccs.db'], Raw),
    absolute_file_name(Raw, Path).

carregar_base :-
    db_file(Path),
    db_attach(Path, []).

limpar_base :-
    retractall_tcc(_, _, _, _, _),
    retractall_resumo(_, _),
    retractall_autor(_, _),
    retractall_orientador(_, _),
    retractall_palavra_chave(_, _).

% Insere/atualiza o TCC e o resumo em transação.
upsert_tcc(Id, Titulo, Ano, Curso, PdfUrl, Resumo) :-
    with_mutex(db, (
        retractall_tcc(Id, _, _, _, _),
        retractall_resumo(Id, _),
        assert_tcc(Id, Titulo, Ano, Curso, PdfUrl),
        ( Resumo == "" -> true ; assert_resumo(Id, Resumo) )
    )).

add_autor(Id, Nome)          :- assert_autor(Id, Nome).
add_orientador(Id, Nome)     :- assert_orientador(Id, Nome).
add_palavra_chave(Id, P)     :- assert_palavra_chave(Id, P).
set_resumo(Id, Texto)        :- retractall_resumo(Id, _), assert_resumo(Id, Texto).
