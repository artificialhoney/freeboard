#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

until curl --output /dev/null --silent --head --fail http://localhost:8088; do
    printf '.'
    sleep 5
done

$SCRIPT_DIR/.venv/bin/python $SCRIPT_DIR/player.py
