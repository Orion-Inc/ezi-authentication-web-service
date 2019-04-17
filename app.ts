"use strict";
require("module-alias/register");
import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"

// Configure the dotenv file and load all the credentials from that file
dotenv.config({ path: ".env" });

let app = express();

app.set("PORT", process.env.PORT || 8088);


//setting up the default header configurations here
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan("dev"));

//Testing endpoint
app.get("/testing", (req, res) => {
    res.status(200)
        .json({
            message: "Active: Server is up and running !!!",
            success: true,
            results: {}
        });
});


//starting the server by doing the configurations here
http.createServer(app).listen(app.get('PORT'), () => {
    console.log(process.env.API_NAME);
    console.log('Version Number ::->' + process.env.API_VERSION_NUMBER);
    console.log(`Server up and running: http://localhost:${app.get('PORT')}`);
});

export default app;