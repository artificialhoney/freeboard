#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

until curl --output /dev/null --silent --head --fail http://localhost:8088; do
    printf '.'
    sleep 5
done

. $SCRIPT_DIR/.env.player

flags=(
   --kiosk
   --touch-events=enabled
   --disable-pinch
   --noerrdialogs
   --disable-session-crashed-bubble
   --simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT'
   --disable-component-update
   --overscroll-history-navigation=0
   --disable-features=TranslateUI
   --autoplay-policy=no-user-gesture-required
)

# Standard behavior - runs chromium
chromium-browser "${flags[@]}" --app=$FREEBOARD_PLAYER_URL
exit;
