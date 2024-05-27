const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateItem = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateItem}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    // IF DIRECTORY DOES NOT EXIST
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    // IF FILE DOES NOT EXIST
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};
module.exports = logEvents;
