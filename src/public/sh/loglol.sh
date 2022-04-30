#!/bin/bash

log_name=${1:-access}.log
log_dir=/var/log/nginx
#out_dir=/tmp/logs
out_dir=/var/www/f11snipe.sh/logs
log_file=$log_dir/$log_name
out_file=$out_dir/$log_name

tail -f $log_file | stdbuf -oL -eL sed -r 's/(\b[0-9]{1,3}\.){3}[0-9]{1,3}\b/wtf.lol.gud.try/g' >> $out_file

