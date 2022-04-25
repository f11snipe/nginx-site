#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root :)"
  exit 1
fi

# Find anything within current directory "." (recursive) that isn't owned by $USER:$USER
find . \( ! -user $USER -o ! -group $USER \) -ls

find . \( ! -user $USER -o ! -group $USER \) -exec chown -R $USER:$USER {} \;

