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
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoute = require("./Route/userRoute");
const coinRoute = require("./Route/coinRoute");
const triviaRoute = require("./Route/triviaRoute");
const guessBookRoute = require("./Route/guessBookRoute");
const scratchCardRoute = require("./Route/scratchCardRoute");
const badgeRoute = require("./Route/badgeRoute");
const marketplaceRoute = require("./Route/marketplaceRoute");
const orderRoute = require("./Route/orderRoute");

databaseConnection();

app.use("/user", userRoute);
app.use("/coin", coinRoute);
app.use("/trivia", triviaRoute);
app.use("/guessbook", guessBookRoute);
app.use("/scratchcard", scratchCardRoute);
app.use("/badge", badgeRoute);
app.use("/marketplace", marketplaceRoute);
app.use("/order", orderRoute);

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});