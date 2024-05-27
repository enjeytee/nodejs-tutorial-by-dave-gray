const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
// create object
class Emitter extends EventEmitter {}
// initialize object
const myEmitter = new Emitter();
// add listener for the log event
myEmitter.on("log", (msg, filename) => logEvents(msg, filename));
const PORT = process.env.PORT || 3500;

// THIS FUNCTION SERVES THE FILES
const serveFile = async (filePath, contentType, response) => {
  try {
    // ADDED .includes TO SHOW THE IMAGE
    const rawData = await fsPromises.readFile(
      filePath,
      contentType.includes("image") ? "" : "utf8"
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    // CHECK IF 404 (file not found)
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

// CREATE A SERVER
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // LOG/EMIT EVENT
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // FOLLOWING IS AN EXAMPLE OF AN INEFFICIENT RESPONSE
  // let filePath;
  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   filePath = path.join(__dirname, "views", "index.html");
  //   fs.readFile(filePath, "utf8", (err, data) => {
  //     if (err) throw console.log(err);
  //     res.end(data);
  //   });
  // }

  const extension = path.extname(req.url);
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // THE FOLLOWING MAKES .html NOT REQUIRED IN THE BROWSER
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  // CHECK IF FILE EXISTS
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    // 301 redirect
    switch (path.parse(filePath).base) {
      // HERE WE HAD AN OLD PAGE AND REDIRECT IT TO THE NEW PAGE
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// LISTEN TO THE PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // add listener for the log event
// myEmitter.on("log", (msg) => logEvents(msg));

// // emit event
// myEmitter.emit("log", "Log event emitted!");
