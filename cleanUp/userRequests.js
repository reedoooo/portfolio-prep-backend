const express = require("express");
const app = express();
const authMiddleware = require("./authMiddleware");

require("dotenv").config();

// Middleware for parsing JSON in request body
app.use(express.json());

// Protected route for getting user data
app.get("/users/:userId", authMiddleware, (req, res) => {
  const userId = req.params.userId;

  // Fetch user data from Auth0 or your database based on userId
  // Example: const userData = await getUserDataFromAuth0(userId);

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(userData);
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
