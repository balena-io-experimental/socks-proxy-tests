#!/bin/bash
echo "Running test-01-cli..."

# Login into balenCloud Prod
echo "balena login..."
balena login --token "${CLI_API_KEY}"

# Create a new empty app on your dashboard called wifi-connect (CLI).
echo "balena app create..."
balena app create socks-device -o gh_vipulgupta2048 -t raspberrypi3 

# Download the OS variant to be tested to a temporary image file
echo "balena OS download..."
balena os download raspberrypi3 -o /tmp/raspberrypi3.img --version v2.58.3+rev1.prod || exit 1

# Configure the OS image and add the image to the wifi-connect app with ETHERNET ONLY
echo "balena OS configure..."
balena os configure /tmp/raspberrypi3.img -a socks-device --config-network ethernet

# Preload the configured OS image and pin the release to current (the release from the previous push command)
# echo "balena preload..."
# balena preload /tmp/raspberrypi3.img -a socks-device --pin-device-to-release -c current -P /var/run/docker.sock --debug

exit 0
