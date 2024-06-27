const mongoose = require("mongoose");
 
const user = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = new mongoose.model("User", user);
module.exports = User;
