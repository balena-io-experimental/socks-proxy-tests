#!/bin/bash

SET_HOST_CONFIG=$( jq -n --arg du "$DEVICE_UUID" \
             '{ "uuid": $du, "method": "PATCH", "data": { "network": { "proxy": { "type": "socks5", "ip": "10.42.0.249", "port": 8123}, "hostname": "" }}}' )

curl --request POST \
     --url https://api.balena-cloud.com/supervisor/v1/device/host-config \
     --header "authorization: Bearer ${API_KEY}" \
     --header 'content-type: application/json' \
     --data "${SET_HOST_CONFIG}"

GET_HOST_CONFIG=$( jq -n --arg du "$DEVICE_UUID" '{ "uuid": $du, "method": "GET" }')
echo "Host-config configuration on device:"

curl -X POST --header "Content-Type:application/json" \
    --header "authorization: Bearer ${API_KEY}" \
    --data "${GET_HOST_CONFIG}" \
    "https://api.balena-cloud.com/supervisor/v1/device/host-config" | jq 
