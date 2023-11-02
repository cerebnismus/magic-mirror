#!/bin/sh

set -e

CHROMIUM_TEMP=~/tmp/chromium
rm -Rf ~/.config/chromium/
rm -Rf $CHROMIUM_TEMP
mkdir -p $CHROMIUM_TEMP

DISPLAY=:0 chromium-browser --noerrdialogs --disable-session-crashed-bubble --incognito --disable \
        --disable-translate \
        --disable-infobars \
        --disable-suggestions-service \
        --disable-save-password-bubble \
        --disk-cache-dir=$CHROMIUM_TEMP/cache/ \
        --user-data-dir=$CHROMIUM_TEMP/user_data/ \
        --start-maximized \
        --kiosk /home/raspi/magicmirror6/index.html &

CHROME=$(echo $!)

echo $CHROME

sleep 5

DISPLAY=:0 xdotool search --onlyvisible --class chromium-browser windowactivate --sync key F11



sleep 30

kill -9 $CHROME
