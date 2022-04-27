#!/bin/bash

path=/tmp
data=$path/.f11
target=f11-linux
install=f11
p_install=$path/$install
c_install=$p_install.xz

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

confirmYes() {
  echo ""
  msg="${1:-Are you sure?}"
  read -r -p "${msg} [Y/n] " response
  case "$response" in
    [nN][oO]|[nN])
      return 1
    ;;
    *)
      return 0
    ;;
  esac
}

function cleanup() {
  echo
  warn "Cleaning up ..."

  log "Installed File(s)"
  ls -alrth $path/f11*

  for f in $path/f11*; do
    if confirmYes "Remove File: $f ?"; then
      rm $f
      log "Removed: $f"
    else
      warn "Keeping File: $f"
    fi
  done

  if [ -d $data ]; then
    log "Existing Data: $data"
    ls -alrth $data/

    if confirmYes "Purge Data Folder: $data ?"; then
      rm -rf $data
      log "Removed Data: $data"
    else
      warn "Keeping Data: $data"
    fi
  fi

  log "Done :)"
}


log "Instant Install"
log "Platform: $platform"

if [ -e $p_install ]; then
  log "Purging Install: $p_install"
  rm $p_install
fi

if [[ "$platform" == "Linux" ]]; then
  # Install on linux
  log "Install for linux ..."
  target=f11-linux
elif [[ "$platform" == "Darwin" ]]; then
  # Install on macos
  log "Install for macos ..."
  target=f11-macos
else
  # Install on windows
  log "Install for windows ..."
  target=f11-win.exe
fi

comp=$target.xz
url=https://f11snipe.sh/$comp

log "Using Target: $target"
log "Download To: $c_install"
log "Download From: $url"

curl -L $url -o $c_install

log "Extracting Archive: $c_install"
xz -d $c_install

log "Allow Execute: $p_install"
chmod +x $p_install

if [ -x $p_install ]; then
  log "Running: $p_install"
  trap cleanup SIGINT TERM
  eval $p_install
  # wait
else
  warn "Unable to verify executable: $p_install"
  exit 1
fi
