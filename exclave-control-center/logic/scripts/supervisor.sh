curl -X POST --header "Content-Type:application/json" \
    --header "Authorization: Bearer ${BALENA_API_KEY}" \
    --data '{
        "uuid": ${DEVICE_UUID}, 
        "method": "PATCH", 
        "data": {
            "network": { 
                "proxy": {
                    "type": "socks5",
                    "ip": ${SHORT_DEVICE_UUID},
                    "port": 8123,
                    "login": "username",
                    "password": "password",
                    "noProxy": [ "152.10.30.4", "253.1.1.0/16" ]
                },
            }
        }
    }' \
    "https://api.balena-cloud.com/supervisor/v1/device/host-config"
