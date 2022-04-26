#!/bin/bash

path=/tmp
target=f11-linux
install=/tmp/f11
platform=$(uname -s)

log() {
  cyan='\033[0;36m'
  nocolor='\033[0m'
  prefix="[F11.sh] ======>>  "
  suffix="  <<======"
  echo -e "${cyan}${prefix}${1}${suffix}${nocolor}"
}

warn() {
  yellow='\033[0;33m'
  nocolor='\033[0m'
  prefix="[F11.sh] ======>>  "
  suffix="  <<======"
  echo -e "${yellow}${prefix}${1}${suffix}${nocolor}"
}

log "Instant Install"
log "Platform: $platform"

if [ -e $install ]; then
  log "Purging Install: $install"
  rm $install
fi

if [[ "$platform" == "Linux" ]]; then
  # Install on linux
  log "Install for linux ..."
  target=f11-linux
  rm /tmp/f11-linux; curl -sL https://f11snipe.sh/f11-linux.xz -o /tmp/f11-linux.xz && xz -d /tmp/f11-linux.xz && chmod +x /tmp/f11-linux && /tmp/f11-linux
elif [[ "$platform" == "Darwin" ]]; then
  # Install on macos
  log "Install for macos ..."
  target=f11-macos
  rm /tmp/f11-macos; curl -sL https://f11snipe.sh/f11-macos.xz -o /tmp/f11-macos.xz && xz -d /tmp/f11-macos.xz && chmod +x /tmp/f11-macos && /tmp/f11-macos
else
  # Install on windows
  log "Install for windows ..."
  target=f11-win.exe
  rm /tmp/f11-win.exe; curl -sL https://f11snipe.sh/f11-win.exe.xz -o /tmp/f11-win.exe.xz && xz -d /tmp/f11-win.exe.xz && chmod +x /tmp/f11-win.exe && /tmp/f11-win.exe
fi

comp=$target.xz
url=https://f11snipe.sh/$comp

log "Using Target: $target"
log "Download To: $path/$comp"
log "Download From: $url"

curl -L $url -o $path/$comp

log "Extracting Archive: $comp"
xz -d $path/$comp

log "Allow Execute: $path/$target"
chmod +x $path/$target

if [ -x $path/$target ]; then
  log "Running: $path/$target"
  exec $path/$target
else
  warn "Unable to verify executable: $path/$target"
  exit 1
fi
