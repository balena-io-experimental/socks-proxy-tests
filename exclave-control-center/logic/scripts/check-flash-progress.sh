#!/bin/bash

curl -s testblockbot:5001/flash?path=/images/raspberrypi3.img

while :; do
  progress=$(curl -s testblockbot:5001/flash-progress)
  if [[ "$progress" == *"Flashing Completed"* ]]; then
    echo "Flashing Completed"
    exit 0
  fi
done
