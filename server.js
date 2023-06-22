// Load dependencies
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { requiresAuth } = require("express-openid-connect");
const axios = require("axios");
// require('dotenv').config();

// Configure dotenv
dotenv.config();
console.log(process.env.OPENAI_API_KEY);

// Import routes
const webRoutes = require("./routes/webRoutes");
const myProfileRoutes = require("./routes/api/myProfileRoutes");
const myTabRoutes = require("./routes/api/myTabRoutes");
const myTodoRoutes = require("./routes/api/myTodoRoutes");
const myNotesRoutes = require("./routes/api/myNotesRoutes");
const myOpenAiRouter = require("./routes/api/myOpenAiRoutes");
const mySettingsRoutes = require("./routes/api/mySettingsRoutes");
const myAuthRoutes = require("./routes/api/myAuthRoutes");

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
app.use("/api", myProfileRoutes);
app.use("/api", myTabRoutes);
app.use("/api", myTodoRoutes);
app.use("/api", myNotesRoutes);
app.use("/api", mySettingsRoutes);
app.use("/api/chat", myOpenAiRouter);
app.use("/signin", myAuthRoutes);
app.use(webRoutes);

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.post("/oauth/token", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      data: {
        authRequired: false,
        auth0Logout: true,
        client_id: "pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn",
        client_secret:
          "X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC",
        audience: "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      },
    };

    const response = await axios(options);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching token", error });
  }
});

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
