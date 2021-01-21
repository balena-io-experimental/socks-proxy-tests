#!/bin/sh

echo "Start logger"

while IFS= read -r line; do
  echo "${line}" >> /usr/src/core/test.log
done