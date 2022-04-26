#!/bin/bash

echo "Automated F11 install"

platform=$(uname -s)

if [[ "$platform" == "Linux" ]]; then
  # Install on linux
  echo "Install F11 for linux ..."
elif [[ "$plaltform" == "Darwin" ]]; then
  # Install on macos
  echo "Install F11 for linux ..."
else
  # Install on windows
  echo "Install F11 for windows ..."
fi
