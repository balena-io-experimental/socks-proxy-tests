const { getSdk } = require('balena-sdk');
const os = require("os")

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: os.userInfo().homedir + "/.balena"
});

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

const deviceFinder = async (appName = "socks-device") => {
  console.log(`Looking for the device in ${appName}`)
  const appsData = await balena.models.application.getAllWithDeviceServiceDetails()
  for (const appNumber in appsData) {
    if (appsData[appNumber]["app_name"] === appName) {
      const deviceName = appsData[appNumber]["owns__device"][0]["device_name"]
      const status = appsData[appNumber]["owns__device"][0]["api_heartbeat_state"]
      const os = appsData[appNumber]["owns__device"][0]["os_version"]

      // await require('fs').promises.writeFile("/root/.bashrc", `export DEVICE_UUID=${appsData[appNumber]["owns__device"][0]["uuid"]}`)
      // await require('fs').promises.writeFile("/root/.bashrc", `export DEVICE_UUID=${appsData[appNumber]["owns__device"][0]["uuid"]} \n export SHORT_DEVICE_UUID=${appsData[appNumber]["owns__device"][0]["uuid"].substring(0, 7)}.local`)

      if (status === "online") {
        console.log(`Found an ${status} device named ${deviceName} running ${os}`)
        return 0
      }
    }
  }
  console.log("Waiting 30 seconds for it to show up ...")
  await wait(30000)
}

try {
  deviceFinder(process.argv[2])
  return 0
} catch (err) {
  console.log(`Test unsuccessful: ${err}`)
  return 1
}
