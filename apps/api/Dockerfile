FROM swipl:10.0.2

WORKDIR /app

COPY apps/api/src ./apps/api/src

RUN mkdir -p apps/api/data \
    && swipl -q -g "sync, halt" -t "halt(1)" apps/api/src/ingest.pl

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "swipl -q -g \"iniciar($PORT), thread_get_message(_)\" -t halt apps/api/src/server.pl < /dev/null"]
