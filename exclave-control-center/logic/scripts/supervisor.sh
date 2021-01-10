#  curl -X POST --header "Content-Type:application/json" \
#     --header "authorization: Bearer ${API_KEY}" \
#     --data '{"uuid": "${DEVICE_UUID}", "method": "GET"}' \
#     "https://api.balena-cloud.com/supervisor/v1/device/host-config"

curl --request POST \
    --url https://api.balena-cloud.com/supervisor/v1/device/host-config \
    --header "authorization: Bearer ${API_KEY}" \
    --header 'content-type: application/json' \
    --data '{
        "uuid": "${DEVICE_UUID}", 
        "method": "PATCH", 
        "data": {
            "network": { 
                "proxy": {
                    "type": "socks5",
                    "ip": "10.42.0.249",
                    "port": 8123,
                    "login": "",
                    "password": "",
                    "noProxy": []
                },
                "hostname": ""
                }
            }
        }
    }'
