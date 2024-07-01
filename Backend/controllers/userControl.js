const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  // using bcrypt
  const { Username, email, contactNo, password } = req.body;
  //hash the password
  const hashedPwd = await bcrypt.hash(password, 10); // in 10 rounds
  const userAvailable = await User.findOne({ email }); // jo sabse pehla milega
  if (userAvailable) {
    res.status(400);
    throw new Error("email already exists");
  }
  const user = await User.create({
    Username,
    email,
    contactNo,
    password: hashedPwd,
  });
  console.log("User registered!!");
  console.log(user);
  res.json({ message: `user: ${Username} registered : ${user}` });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });

  // console.log(process.env.ACCESS_TOKEN_SECRET);
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          Username: user.Username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }

  console.log(req);
  console.log("You are logged in");
  res.json({message: "Login ka response"});
});

// Happy birthday (for testing)
const wish = async (req, res) => {
  res.json(req.user);
};

// export more than 1
module.exports = { registerUser, loginUser, wish };
