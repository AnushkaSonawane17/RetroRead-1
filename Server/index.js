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

//const userRoute = require("./Route/userRoute");

databaseConnection();

//app.use("/user", userRoute);

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});