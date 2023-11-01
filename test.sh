

DISPLAY=:0 chromium-browser --noerrdialogs --disable-session-crashed-bubble --incognito /home/raspi/magicmirror6/index.html &

CHROME=$(echo $!)

echo $CHROME

sleep 5

DISPLAY=:0 xdotool search --onlyvisible --class chromium-browser windowactivate --sync key F11

sleep 5

kill -9 $CHROME
