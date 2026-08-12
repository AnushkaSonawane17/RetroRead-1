// const databaseConnection=require('./database');
// const express=require('express')
// const app=express();
// app.use(express.json());
// const userRoute = require("./Route/userRoute");

// databaseConnection();

// app.listen(4000, ()=>{
//     console.log("Server is listening on port 3000");
    
// })
const databaseConnection = require("./database");
const express = require("express");

const app = express();

app.use(express.json());

const userRoute = require("./Route/userRoute");
const coinRoute = require("./Route/coinRoute");
const streakRoute = require("./Route/streakRoute");

databaseConnection();

app.use("/user", userRoute);
app.use("/coin", coinRoute);
app.use("/streak", streakRoute);

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});