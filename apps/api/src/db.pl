:- module(db, [
    carregar_base/0,
    limpar_base/0,
    upsert_tcc/6,
    add_autor/2,
    add_orientador/2,
    add_palavra_chave/2,
    set_resumo/2,
    tcc/5,
    tcc_titulo_norm/2,
    resumo/2,
    autor/2,
    autor_norm/2,
    orientador/2,
    orientador_norm/2,
    palavra_chave/2,
    palavra_chave_norm/2
]).

% Base de dados dinâmica dos TCCs, persistida em data/tccs.db via
% library(persistency). Modelo relacional normalizado: multivalorados = N fatos.

:- use_module(library(persistency)).
:- use_module(normaliza).

:- persistent
    tcc(id:string, titulo:string, ano:integer, curso:string, pdf_url:string),
    tcc_titulo_norm(id:string, titulo_norm:string),
    resumo(id:string, texto:string),
    autor(id:string, nome:string),
    autor_norm(id:string, nome_norm:string),
    orientador(id:string, nome:string),
    orientador_norm(id:string, nome_norm:string),
    palavra_chave(id:string, palavra:string),
    palavra_chave_norm(id:string, palavra_norm:string).

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
    retractall_tcc_titulo_norm(_, _),
    retractall_resumo(_, _),
    retractall_autor(_, _),
    retractall_autor_norm(_, _),
    retractall_orientador(_, _),
    retractall_orientador_norm(_, _),
    retractall_palavra_chave(_, _),
    retractall_palavra_chave_norm(_, _).

% Insere/atualiza o TCC e o resumo em transação.
upsert_tcc(Id, Titulo, Ano, Curso, PdfUrl, Resumo) :-
    with_mutex(db, (
        retractall_tcc(Id, _, _, _, _),
        retractall_tcc_titulo_norm(Id, _),
        retractall_resumo(Id, _),
        assert_tcc(Id, Titulo, Ano, Curso, PdfUrl),
        normaliza(Titulo, TituloN),
        assert_tcc_titulo_norm(Id, TituloN),
        ( Resumo == "" -> true ; assert_resumo(Id, Resumo) )
    )).

add_autor(Id, Nome)      :- assert_autor(Id, Nome), normaliza(Nome, N), assert_autor_norm(Id, N).
add_orientador(Id, Nome) :- assert_orientador(Id, Nome), normaliza(Nome, N), assert_orientador_norm(Id, N).
add_palavra_chave(Id, P) :- assert_palavra_chave(Id, P), normaliza(P, N), assert_palavra_chave_norm(Id, N).
set_resumo(Id, Texto)        :- retractall_resumo(Id, _), assert_resumo(Id, Texto).
