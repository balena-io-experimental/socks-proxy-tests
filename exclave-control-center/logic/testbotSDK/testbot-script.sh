#!/bin/bash

echo "deviceInteractor.powerOff()" | node testbot.js ${REPL_HOST}:5001

echo "deviceInteractor.powerOn()" | node testbot.js ${REPL_HOST}:5001


# [Test]
# WorkingDirectory=/usr/src/core/logic/testbotSDK
# ExecStart=testbot-script.sh echo "deviceInteractor.powerOff()" | node testbot.js ${REPL_HOST}:5001 
# Name=Power OFF the DUT
# ExecStopSucess=echo "deviceInteractor.powerOn()" | node testbot.js ${REPL_HOST}:5001
# require=balena-os-configure, testbot-flash-dut
# Type=simple
