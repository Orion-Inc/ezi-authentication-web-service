"use strict";
import "module-alias/register";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
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


export default app;