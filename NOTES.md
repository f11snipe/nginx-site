# Notes

### Install nginx with ssl preread

```
    5  apt install curl wget vim
    6  apt install curl wget vim
    7  wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.40/pcre2-10.40.tar.gz
    8  wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.40/pcre2-10.40.tar.gz
    9  wget http://zlib.net/zlib-1.2.13.tar.gz
   10  wget http://zlib.net/zlib-1.2.13.tar.gz
   11  du -sh *
   12  apt search zlib
   13  curl -IL http://zlib.net/zlib-1.2.13.tar.gz
   14  curl -IL http://zlib.net/zlib-1.2.13.tar.gz -o zlib.tgz
   15  ls -al
   16  curl -L http://zlib.net/zlib-1.2.13.tar.gz -o zlib.tgz
   17  wget  https://nxzlb.ngrok.io//zlib-1.2.13.tar.gz
   18  ls -al
   19  rm zlib.tgz
   20  rm zlib-1.2.13.tar.gz
   21  rm zlib-1.2.13.tar.gz.1
   22  mv zlib-1.2.13.tar.gz.2 zlib-1.2.13.tar.gz
   23  ls
   24  ls -al
   25  wget http://www.openssl.org/source/openssl-1.1.1p.tar.gz
   26  wget https://nginx.org/download/nginx-1.22.1.tar.gz
   27  ls
   28  for f in *; do tar -xzvf $f; done
   29  ls
   30  cd nginx-1.22.1
   31  ls
   32  ./configure
   33  apt install build-essentials
   34  apt install build-essential
   35  apt install build-essential
   36  ./configure
   37   clear
   38  ls -al ../
   39  ./configure --with-pcre../pcre2-10.40 --with-zlib=../zlib-1.2.13 --with-stream --with-http_ssl_module --with-stream_ssl_preread_module
   40  ./configure --with-pcre=../pcre2-10.40 --with-zlib=../zlib-1.2.13 --with-stream --with-http_ssl_module --with-stream_ssl_preread_module
   41  ls -al ../
   42  ./configure --with-pcre=../pcre2-10.40 --with-zlib=../zlib-1.2.13 --with-openssl=../openssl-1.1.1p --with-stream --with-http_ssl_module --with-stream_ssl_preread_module
   43  nginx -t
   44  ls
   45  make
   46  make install
   47  nginx -t
   48  systemctl status nginx
   49  history
   50  ls -al /usr/local/nginx/sbin?
   51  ls -al /usr/local/nginx/sbin/
   52  /usr/local/nginx/sbin/nginx -t
   53  /usr/local/nginx/sbin/nginx
   54  ps auxf
   55  lsof -i -P -n
   56  /sbin/ss
   57  /usr/local/nginx/sbin/nginx --status
   58  /usr/local/nginx/sbin/nginx -s reload
   59  curl localhost
   60  history
```
