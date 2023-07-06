// Load dependencies
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

// Configure dotenv
dotenv.config();

// Import routes
const webRoutes = require("./routes/webRoutes");
const myUserRoutes = require("./routes/api/myUserRoutes");
const myTabRoutes = require("./routes/api/myTabRoutes");
const myTodoRoutes = require("./routes/api/myTodoRoutes");
const myNotesRoutes = require("./routes/api/myNotesRoutes");
const myOpenAiRouter = require("./routes/api/myOpenAiRoutes");
const mySettingsRoutes = require("./routes/api/mySettingsRoutes");
const myProfileRoute = require("./routes/api/myProfileRoute");

// Set up Express app
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware Configuration
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route Handlers
app.use("/api/myUserRoutes", myUserRoutes);
app.use("/api/tab", myTabRoutes);
app.use("/api/todo", myTodoRoutes);
app.use("/api/notes", myNotesRoutes);
app.use("/api/settings", mySettingsRoutes);
app.use("/api/chat", myOpenAiRouter);
app.use("/api/myProfileRoute", myProfileRoute);
app.use("/", webRoutes);

// Error Handlers
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB and listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
