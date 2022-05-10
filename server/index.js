const express = require("express");
const cookieParser = require('cookie-parser')
const momgoose = require("mongoose");
const router = require("./router");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

app.use("/auth", router);


const start = async () => {
    try {
        await momgoose.connect("mongodb://localhost:27017/jwtdb")
     app.listen(3000, () => {
         console.log("server started")
     })
    }
    catch(e) {
     console.log(e)
    }
}

start();