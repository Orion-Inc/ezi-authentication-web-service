"use strict";
// tslint:disable-next-line:no-var-requires
require("module-alias/register");
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import mongoose from "mongoose";
import morgan from "morgan";

// Configure the dotenv file and load all the credentials from that file
dotenv.config({ path: ".env" });

const app: express.Application = express();

app.set("PORT", process.env.PORT || 8088);

// making the database connection here to the mongoose
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_URL_LOCAL, {
    dbName: "schools",
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
   console.log("Connection opened and available to accept data");
});

// setting up the default header configurations here
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan("dev"));

// Testing endpoint
app.get("/testing", (req, res) => {
    res.status(200)
        .json({
            message: "Active: Server is up and running !!!",
            success: true
        });
});

// starting the server by doing the configurations here
http.createServer(app).listen(app.get("PORT"), () => {
    console.log(process.env.API_NAME);
    console.log("Version Number ::->" + process.env.API_VERSION_NUMBER);
    console.log(`Server up and running: http://localhost:${app.get("PORT")}`);
});

export default app;