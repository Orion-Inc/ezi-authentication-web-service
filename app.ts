"use strict";
import "module-alias/register";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {Request, Response} from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
class Server {
    public app: express.Application;
    public constructor(){
        this.app = express();
        this.config();
        this.mongo();
    }

    public config(): void {
        dotenv.config({ path: ".env" });
        this.app.set("PORT", process.env.PORT || 8088);
        // setting up the default header configurations here
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(morgan("dev"));
    }

    protected mongo(): void {
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
    }

    public start(): void {
        this.app.listen(this.app.get("PORT"),() => {
            console.log(process.env.API_NAME);
            console.log("Version Number ::->" + process.env.API_VERSION_NUMBER);
            console.log(`Server up and running: http://localhost:${this.app.get("PORT")}`);
        });
    }
}

export default Server;