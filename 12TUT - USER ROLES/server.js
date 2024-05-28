const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require(path.join(__dirname, "middleware", "logEvents"));
const errorHandler = require(path.join(
  __dirname,
  "middleware",
  "errorHandler"
));
const verifyJWT = require("./middleware/verifyJWT"); // <- THIS WAS MOVED FROM employees.js
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// custom middleware - logger NOTE: needs next parameter
app.use(logger);

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials);

// 3rd party middleware - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data, in other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built-in middleware - serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes
app.use("^/$", require("./routes/root"));
// app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT); // <- This is where JWT starts
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
