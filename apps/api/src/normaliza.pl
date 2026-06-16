:- module(normaliza, [
    normaliza/2,
    contem/2
]).

% Correspondência parcial, insensível a acento e caixa. A normalização
% (minúsculas + NFD sem marcas combinantes) é aplicada aos dois lados.

:- use_module(library(unicode)).

normaliza(Texto, Normalizado) :-
    atom_string(Texto, S),
    string_lower(S, Lower),
    unicode_nfd(Lower, Decomposed),
    atom_codes(Decomposed, Codes),
    exclude(marca_combinante, Codes, SemAcento),
    string_codes(Normalizado, SemAcento).

% Marcas combinantes Unicode (U+0300..U+036F) separadas pela decomposição NFD.
marca_combinante(Code) :-
    Code >= 0x0300,
    Code =< 0x036F.

contem(Texto, Termo) :-
    normaliza(Texto, TextoN),
    normaliza(Termo, TermoN),
    sub_string(TextoN, _, _, _, TermoN).
