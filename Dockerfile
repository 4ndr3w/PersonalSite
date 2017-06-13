FROM caddy

COPY Caddyfile /app/Caddyfile
COPY public /app/

WORKDIR /app

CMD caddy