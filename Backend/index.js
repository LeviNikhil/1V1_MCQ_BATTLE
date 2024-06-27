require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongoose");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));            // parse data

// Routes
const userRoutes = require("./routes/userRoutes");
const mcqRoutes = require("./routes/mcqRoutes");

app.use("/api/users", userRoutes);
app.use("/api/mcqs", mcqRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
    console.log(`server started at port ${process.env.PORT}`)
});