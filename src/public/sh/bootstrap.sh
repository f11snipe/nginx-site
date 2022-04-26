#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root :)"
  exit 1
fi

# TODO: Automatic release detect and use different pkg manager?
apt-get update
apt-get upgrade -y
apt-get install -y git build-essential zsh vim figlet sl silversearcher-ag

# Install oh-my-zsh (requires zsh above)
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Setup scmbreeze (git shorcuts)
git clone https://github.com/scmbreeze/scm_breeze.git ~/.scm_breeze
~/.scm_breeze/install.sh

curl -sL https://f11snipe.sh/rc/vimrc -o ~/.vimrc
curl -sL https://f11snipe.sh/rc/zshrc -o ~/.zshrc

echo "finished" | figlet
