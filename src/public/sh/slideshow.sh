#!/bin/bash

array[0]="200/color/elliot-hello-friend.txt"
array[1]="200/color/hello-friend-tall.txt"
array[2]="200/color/hello-friend.txt"
array[3]="200/color/leave-me-here.txt"
array[4]="derp-60.txt"
array[5]="derp-100.txt"
array[6]="glhf.txt"
array[7]="welcome.txt"
array[8]="dbz.txt"
array[9]="elliot-hackerman.txt"
array[10]="ftw.txt"
array[11]="hack.txt"
array[12]="hackerman.txt"
array[13]="hackermansq.txt"
array[14]="haha.txt"
array[15]="hahas.txt"
array[16]="lol.txt"
array[17]="lolz.txt"
array[18]="mantra.txt"
array[19]="nginx-full.txt"
array[20]="nginx-icon.txt"
array[21]="nginx-logo.txt"
array[22]="nginx.txt"

warn() {
        yellow='\033[0;33m'
        nocolor='\033[0m'
        prefix="======>>  "
        suffix="  <<======"
        echo -e "${yellow}${prefix}${1}${suffix}${nocolor}"
}

log() {
        cyan='\033[0;36m'
        nocolor='\033[0m'
        prefix="======>>  "
        suffix="  <<======"
        echo -e "${cyan}${prefix}${1}${suffix}${nocolor}"
}

while true; do
        size=${#array[@]}
        index=$(($RANDOM % $size))
        rand=${array[$index]}

        warn "Loading ascii $rand"

        curl -sL https://f11snipe.sh/art/$rand

        arr=('|' '/' '-' '\')

        for c in $(seq 1 5); do
                for elt in ${arr[*]}; do
                        echo -ne "\r\033[<1>AWaiting $elt" && sleep 0.1;
                done
        done

        echo "-"
        log "Still alive"
done
