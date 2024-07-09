const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Hash the password
  const hashedPwd = await bcrypt.hash(password, 10);

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // Create new user
  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPwd,
  });

  console.log("User registered!!");
  console.log(user);

  res.status(201).json({ message: `User: ${first_name} ${last_name} registered successfully` });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  // Compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5h" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }

  console.log("You are logged in");
  res.json({ message: "Login successful" });
});

const wish = (req, res) => {
  res.status(200).json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
};

module.exports = { registerUser, loginUser, wish };
