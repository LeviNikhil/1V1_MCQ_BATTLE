const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect =  () => {
    mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(console.log("Conected to database !"))
    .catch((err) => {
        console.error("Error while Connecting to Database : ", err);
        process.exit(1);
    });
}

module.exports = dbConnect;
