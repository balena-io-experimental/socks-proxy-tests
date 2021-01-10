const express = require('express')
const { RaspberryPi, TestBotHat } = require('@balena/testbot')
const asyncHandler = require('express-async-handler')

// Initialize Express, SDK among other things.
const testbot = new TestBotHat((msg) => console.log(`testbot: ${msg}`));
const deviceInteractor = new RaspberryPi(testbot);
const app = express()
const SERVER_PORT = 5001

app.get('/', (req, res) => {
  return res.status(200).send('OK');
});

app.get('/ping', (req, res) => {
  console.log(`TestbotSDK-block listening at http://localhost:${SERVER_PORT}`);
  return res.status(200).send('OK');
});

app.listen(SERVER_PORT, asyncHandler( async() => {
  await testbot.setup()
  console.log(`TestbotSDK-block listening at http://localhost:${SERVER_PORT}`);
}));

app.get('/on', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOn()
  return res.status(200).send("Okay Powering On now")
}))

app.get('/setup', asyncHandler(async (req, res) => {
  await testbot.setup()
  return res.status(200).send("Okay Setting up the DUT now")
}))

app.get('/teardown', asyncHandler(async (req, res) => {
  await testbot.teardown()
}))

app.get('/off', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOff()
}))

app.get('/flash', asyncHandler(async (req, res) => {
  await deviceInteractor.flashFromFile(req.query.path);
}))

// Functionality coming soon in a block near you
// Status of DUT, needs serial logging setup to be done beforehand
// app.get('/status', async (req, res) => {
//   try {
//   } catch (error) {
//     return next(error)
//   }
// })
