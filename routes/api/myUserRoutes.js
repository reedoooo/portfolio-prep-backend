const express = require("express");
const router = express.Router();
const Users = require("../../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const {
  verifyToken,
  findUser,
  validatePassword,
  createToken,
} = require("./auth.js");
const mongoose = require("mongoose");

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error(`Error occurred in ${req.path}: `, error);
      next(error);
    });
  };
}

router.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    console.log("signup", req.body);

    const { login_data, basic_info, ...otherInfo } = req.body;
    const { username, password, email, role_data } = login_data;

    console.log("login_data:", login_data);
    console.log("basic_info:", basic_info);
    console.log("username:", username);
    console.log("password:", password);
    console.log("email:", email);
    console.log("role_data:", role_data);

    const { name, age } = basic_info;
    if (!name || !age) {
      return res
        .status(400)
        .json({ message: "Basic_info fields are required" });
    }

    const existingUser = await Users.findOne({
      "login_data.username": username.trim(),
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = new Users({
      login_data: {
        username: username.trim(),
        password: hashedPassword,
        email,
        role_data,
      },
      basic_info,
      ...otherInfo,
    });

    try {
      await newUser.save();
      const token = jwt.sign(
        {
          username: newUser.login_data.username,
          id: newUser._id,
          capabilities: newUser.login_data.role_data.capabilities,
        },
        SECRET_KEY
      );
      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error("Signup validation error: ", error.errors);
        return res
          .status(400)
          .json({ message: "Invalid user data", error: error.errors });
      } else if (error.code === 11000) {
        console.error("Duplicate key signup error: ", error.keyValue);
        return res
          .status(400)
          .json({ message: "Duplicate key error", error: error.keyValue });
      }
      console.error("Signup error: ", error);
      next(error);
    }
  })
);

//... rest of the code is unchanged ...

router.post(
  "/signin",
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const valid = await validatePassword(password, user.login_data.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken({
      username: user.login_data.username,
      id: user._id,
      capabilities: user.capabilities,
    });

    return res.json({ token });
  })
);


router.get(
  "/profile",
  verifyToken,
  asyncHandler(async (req, res, next) => {
		console.log("req.authData:", req.authData);
    const user = await Users.findById(req.authData.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  })
);

router.put(
  "/profile",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const updates = req.body;

    try {
      const user = await Users.findByIdAndUpdate(req.authData.id, updates, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Update error: ", error);
      next(error);
    }
  })
);

router.delete(
  "/profile",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await Users.findByIdAndDelete(req.authData.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete error: ", error);
      next(error);
    }
  })
);

router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send("User not found.");
    res.json(user);
  } catch (error) {
    console.error("Get by ID error: ", error);
    next(error);
  }
});

router.use((error, req, res, next) => {
  console.error("Middleware error: ", error);
  res.status(500).send("Server error.");
});

module.exports = router;
