const fs = require("fs");
const path = require("path");

// FIRST CREATE A READSTREAM, USED TO COPY CONTENT OF A FILE
const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

// THEN CREATE A FILE WHERE TO COPY THE DATA
const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// COPY THE CONTENT OF THE FILE TO THE NEW FILE
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

// CODE BELOW DOES THE SAME THING AS ABOVE CODE
rs.pipe(ws);