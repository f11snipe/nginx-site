FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends curl wget gnupg ca-certificates
RUN wget -O - https://openresty.org/package/pubkey.gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/openresty.gpg
RUN echo "deb http://openresty.org/package/debian bookworm openresty" | tee /etc/apt/sources.list.d/openresty.list
RUN apt-get update && apt-get install -y --no-install-recommends openresty
RUN mkdir -p /usr/local/openresty/nginx/lua

# COPY ./src/conf/koth.conf /etc/nginx/conf.d/koth.conf

COPY openresty/nginx.example.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY openresty/app.lua /usr/local/openresty/nginx/lua/app.lua

EXPOSE 80

CMD ["/usr/bin/openresty", "-g", "daemon off;"]
