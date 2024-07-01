require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongoose");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware

dbConnect();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
// Routes
const userRoutes = require("./routes/userRoutes");
const mcqRoutes = require("./routes/mcqRoutes");

app.use("/api/users", userRoutes);
app.use("/api/mcqs", mcqRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
    console.log(`server started at port ${process.env.PORT}`)
});