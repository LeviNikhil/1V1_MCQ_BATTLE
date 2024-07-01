const express = require("express");
const router = express.Router();
const {registerUser, loginUser, wish} = require("../controllers/userControl");
const validateToken = require("../middlewares/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/auth", validateToken, wish);

module.exports = router;  