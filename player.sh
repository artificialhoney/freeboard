#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

. $SCRIPT_DIR/.env.player

until curl --output /dev/null --silent --head --fail http://localhost:8088; do
    printf '.'
    sleep 5
done

flags=(
   --start-fullscreen
   --kiosk
   --window-size=1920,1080
   --window-position=0,0
)

export DISPLAY=:0.0

sudo -u pi startx /usr/bin/chromium-browser "${flags[@]}" --app=$FREEBOARD_PLAYER_URL --
