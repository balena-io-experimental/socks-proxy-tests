const { getSdk } = require('balena-sdk');
const os = require("os")

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: os.userInfo().homedir + "/.balena"
});

// This is called an IIFE - Immediately-Invoked Function Expression
(async () => {
  console.log("Rebooting the DUT")
  await balena.models.device.reboot(process.env.DEVICE_UUID, function (error) {
    if (error) throw error;
    return 1
  });
  return 0
})()
