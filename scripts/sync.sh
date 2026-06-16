#!/usr/bin/env bash
# Dispara a sincronização da BDM para a base dinâmica do Prolog.
# Uso: bash scripts/sync.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec swipl -q -g "sync, halt" -t "halt(1)" "$ROOT/apps/api/src/ingest.pl"
