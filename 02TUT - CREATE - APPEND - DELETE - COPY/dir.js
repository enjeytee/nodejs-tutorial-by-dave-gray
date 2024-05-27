const fs = require("fs");

// TO CREATE A DIRECTORY - CHECK FIRST IF DIRECTORY EXIST FIRST
if (!fs.existsSync("./new")) {
  // THIS IS HOW TO CREATE A DIRECTORY
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory created.");
  });
}

// SOMEHOW THE CODE BELOW THIS IS NEEDED TO PERFORM THE REMOVE
console.log("This is needed to run the next lines of code... ???");

// TO REMOVE/DELETE DIRECTORY - CHECK IF DIRECTORY EXIST FIRST
if (fs.existsSync("./new")) {
  // THIS IS HOW TO REMOVE/DELETE DIRECTORY
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory removed.");
  });
}

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
