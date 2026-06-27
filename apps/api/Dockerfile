# Backend Prolog do Portal de TCCs.
# A base (tccs.db) é gerada no build (sync com a BDM) e embutida na imagem;
# em runtime o servidor apenas serve.
#
# Contexto de build: raiz do repositório.
FROM swipl:10.0.2

WORKDIR /app

COPY apps/api/src ./apps/api/src

RUN mkdir -p apps/api/data \
    && swipl -q -g "sync, halt" -t "halt(1)" apps/api/src/ingest.pl

# Render injeta PORT; 8080 é o padrão para execução local da imagem.
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "swipl -q -g \"iniciar($PORT), thread_get_message(_)\" -t halt apps/api/src/server.pl < /dev/null"]
