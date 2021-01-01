const { getSdk } = require('balena-sdk');
const os = require("os")

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: os.userInfo().homedir + "/.balena"
});

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

try {
  while (true) {
    async () => {
      await wait(30000)
      const appsData = await sdk.models.application.getAllWithDeviceServiceDetails()
      for (const appNumber in appsData) {
        if (appsData[appNumber]["app_name"] === "socks-device") {
          const deviceName = appsData[appNumber]["owns__device"][0]["device_name"]
          const status = appsData[appNumber]["owns__device"][0]["api_heartbeat_state"]
          const os = appsData[appNumber]["owns__device"][0]["os_version"]
          
          // For Supervisor host config patch
          process.env.DEVICE_UUID = appsData[appNumber]["owns__device"][0]["uuid"]
          process.env.SHORT_DEVICE_UUID = appsData[appNumber]["owns__device"][0]["uuid"].substring(0,7) + ".local"

          if (status === "online") {
            console.log(`Found an ${status} device named ${deviceName} running ${os}`)
            return 0
          }
        }
      }
    }
  }
} catch (err) {
  console.log(`Test unsuccessful: ${err}`)
  return 1
}
