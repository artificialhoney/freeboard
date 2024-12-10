#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

. $SCRIPT_DIR/.env.player

until curl --output /dev/null --silent --head --fail http://localhost:8088; do
    printf '.'
    sleep 5
done

flags=(
   --window-size=1920,1080
   --kiosk
   --disable-infobars
   --noerrdialogs
   --disable-crash-report
   --start-fullscreen
   --start-maximized
   --window-position=0,0
   --ignore-certificate-errors
)

export DISPLAY=:0.0

sudo -u pi startx /usr/bin/chromium-browser "${flags[@]}" --app=$FREEBOARD_PLAYER_URL --
