FROM caddy

COPY Caddyfile /app/Caddyfile
COPY public /app/public

WORKDIR /app

CMD caddy