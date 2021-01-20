#!/bin/bash

source /root/.bashrc

echo "Getting DUT IP"...
ip=$(balena device ${DUT_UUID} | grep "IP ADDRESS" | awk '{print $3}')

# Escaping characters in the IP
# echo ${ip//./\\.}

echo "Fetching Glider Logs"...
balena logs ${BALENA_DEVICE_UUID} --service glider > glider_logs

# Checking the logs for socks5 connection
if tail -n 1 glider_logs | grep -q -E -- "\[socks5\]\s${ip//./\\.}:.+\svia DIRECT$"; then
    echo "DUT conneted to the Glider proxy!"
    exit 0
else
    echo "Couldn't detect DUT connection to the Glider proxy"
    exit 1
fi
