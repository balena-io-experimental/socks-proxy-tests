"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require("repl");
const net = require("net")
const { RaspberryPi, TestBotHat } = require('@balena/testbot')

// Initialize the node REPL making the testbot SDK available as testbot variable.
const testbot = new TestBotHat((msg) => console.log(`testbot: ${msg}`));
const deviceInteractor = new RaspberryPi(testbot);

net.createServer((socket) => {
  const replServer = repl.start({
    prompt: 'TestbotSDK via TCP socket> ',
    input: socket,
    output: socket
  });
  replServer.context['testbot'] = testbot;
  replServer.context['deviceInteractor'] = deviceInteractor;

  socket.on("error", e => {
    console.log(`repl socket error: ${e}`);
  });

  replServer.on('exit', () => {
    socket.end();
  });
}).listen(5001);

// testbot.setup().then(() => {
// testbot.teardown(true);
// });
