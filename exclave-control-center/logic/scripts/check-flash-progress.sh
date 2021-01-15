#!/bin/bash

curl -s testblockbot:5001/flash?path=/images/raspberrypi3.img
progress=$(curl testblockbot:5001/flash-progress)

while :
do
  if [[ "$progress" == *"Flashing Completed"* ]]; then
    echo "Flashing Completed"
    exit 0
  fi
done
