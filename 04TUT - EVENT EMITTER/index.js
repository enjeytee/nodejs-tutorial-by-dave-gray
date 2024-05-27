const { logEvents } = require("./logEvents");

const EventEmitter = require("events");

// create object
class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listnener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // emit event
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
