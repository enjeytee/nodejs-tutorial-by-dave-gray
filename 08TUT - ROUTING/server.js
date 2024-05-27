const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require(path.join(__dirname, "middleware", "logEvents"));
const errorHandler = require(path.join(
  __dirname,
  "middleware",
  "errorHandler"
));
const PORT = process.env.PORT || 3500;

// custom middleware - logger NOTE: needs next parameter
app.use(logger);

// 3rd party middleware - Cross Origin Resource Sharing
// REMEMBER: Create a whitelist
const whitelist = [
  // REMEMBER: Remove development URLs after
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    // REMEMBER: Remove " || !origin " after development
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data, in other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware - serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes
app.use("^/$", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

// app.get("/*", (req, res) => {
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Custom error middleware
app.use(errorHandler);

// LISTEN TO THE PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
