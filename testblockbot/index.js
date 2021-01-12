const express = require('express')
const { RaspberryPi, TestBotHat } = require('@balena/testbot')
const asyncHandler = require('express-async-handler')

// Initialize Express, SDK among other things.
const testbot = new TestBotHat((msg) => console.log(`testbot: ${msg}`));
const deviceInteractor = new RaspberryPi(testbot);
const app = express()
const SERVER_PORT = 5001

app.get('/', (req, res) => {
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
  return res.status(200).send('OK \n');
});

app.get('/ping', (req, res) => {
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
  return res.status(200).send('OK \n');
});

app.listen(SERVER_PORT, asyncHandler(async () => {
  await testbot.setup()
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
}));

app.get('/on', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOn()
  return res.status(200).send("Powering on DUT now \n")
}))

app.get('/setup', asyncHandler(async (req, res) => {
  await testbot.setup()
  return res.status(200).send("Setting up the DUT \n")
}))

app.get('/teardown', asyncHandler(async (req, res) => {
  await testbot.teardown()
  return res.status(200).send("Completed resetting the hub \n")
}))

app.get('/off', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOff()
  return res.status(200).send("Powering off DUT now \n")
}))

app.get('/flash', asyncHandler(async (req, res) => {
  await deviceInteractor.flashFromFile(req.query.path);
  return res.status(200).send(`DUT has been flashed with ${req.query.path} \n`)
}))

// Functionality coming soon in a block near you
// Status of DUT, needs serial logging setup to be done beforehand
// app.get('/status', async (req, res) => {
//   try {
//   } catch (error) {
//     return next(error)
//   }
// })
