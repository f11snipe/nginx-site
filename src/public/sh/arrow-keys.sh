#!/bin/bash

escape_char=$(printf "\u1b")
read -rsn1 mode # get 1 character
if [[ $mode == $escape_char ]]; then
  read -rsn2 mode # read 2 more chars
fi
case $mode in
  'q') echo QUITTING ; exit ;;
  '[A') echo UP ;;
  '[B') echo DN ;;
  '[D') echo LEFT ;;
  '[C') echo RIGHT ;;
  *) >&2 echo 'ERR bad input' ;;
esac
