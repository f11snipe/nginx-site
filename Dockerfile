FROM openresty/openresty:bookworm

RUN mkdir -p /usr/local/openresty/nginx/html/once/testing && \
  cp /usr/local/openresty/nginx/html/index.html /usr/local/openresty/nginx/html/error.html && \
  echo 'only once' > /usr/local/openresty/nginx/html/once/index.html && \
  echo 'hello world' > /usr/local/openresty/nginx/html/once/hello && \
  echo "testing" > /usr/local/openresty/nginx/html/once/testing/test

COPY openresty/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY openresty/app.lua /usr/local/openresty/nginx/lua/app.lua

EXPOSE 80

# CMD ["/usr/bin/openresty", "-g", "daemon off;"]
