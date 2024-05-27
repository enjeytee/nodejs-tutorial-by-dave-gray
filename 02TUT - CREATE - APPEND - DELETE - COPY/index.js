const fs = require("fs");
// YOU CAN ALSO DO THIS
const path = require("path");

// fs.readFile('./files/starter.txt', (err, data) => {
// YOU CAN ALSO DO THIS
// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
// YOU CAN ALSO DO THIS IF YOU USE REQURE PATH
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     // console.log(data.toString());
//     // YOU CAN ALSO DO THIS
//     console.log(data);
//   }
// );

// // THIS SHOWS THAT NODE IS ASYNCHRONOUS
// console.log("Hello...");

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you. ",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete.");

//     // THIS SHOWS THAT APPEND CREATES A FILE IF IT DOES NOT EXIST
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\nYes it is.",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete.");

//         // THIS IS USED TO RENAME A FILE
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename complete.");
//           }
//         );
//       }
//     );
//   }
// );

const fsPromises = require("fs").promises;

// THIS SHOWS THE SAME CODE USING ASYNC AWAIT
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    // UNLINK IS USED TO DELETE A FILE
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt")); 
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\nNice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
