#!/usr/bin/env bash
# Sobe o servidor HTTP do portal (SWI-Prolog) e o mantém em primeiro plano.
# Uso: bash scripts/serve.sh [porta]   (porta padrão: 8080)
set -euo pipefail

PORT="${1:-8080}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec swipl -q -g "iniciar(${PORT}), thread_get_message(_)" \
           -t "halt" "$ROOT/apps/api/src/server.pl" < /dev/null
