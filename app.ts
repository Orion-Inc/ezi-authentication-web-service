"use strict";
import "module-alias/register";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {Request, Response} from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import compression from "compression"
import {default as authWebService} from "./api/v1/authentication-web-service";
import {default as Roles} from "@models/roles";
import {shortForRoles} from "./utils/resolvers";
import {default as RolesPolicy} from "@policies/RolesPolicy"


class Server {
    public app: express.Application;

    public constructor() {
        this.app = express();
        this.config();
        this.mongo();
        this.routes();
        this.testEndpoint();
        this.roles();
    }

    public config(): void {
        dotenv.config({path: ".env"});
        this.app.set("PORT", process.env.PORT || 8088);
        // setting up the default header configurations here
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(morgan("dev"));
        this.app.use(compression());
    }

    public testEndpoint(): void {
        this.app.get("/testing", (req: Request, res: Response) => {
            res.status(200)
                .json({
                    message: "Server Up And Running !!!",
                    success: true
                });
        });
    }

    /**
     * This configurations start the web server
     * @return null
     */
    public start(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log(process.env.API_NAME);
            console.log("Version Number ::->" + process.env.API_VERSION_NUMBER);
            console.log(`Server up and running: http://localhost:${this.app.get("PORT")}`);
        });
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

    /**
     * contains the endpoints for CRUD operations of roles
     * @return null
     */
    protected roles(): void {
        // getting of all roles
        this.app.get("/role/all", (req: Request, res: Response) => {
            Roles.find({}, (err, results) => {
                if (!err && results) {
                    res.status(200)
                        .json({
                            message: "List of Roles",
                            success: true,
                            results: results
                        })
                }
            });
        });
        // saving of roles endpoint
        this.app.post("/role/add", RolesPolicy.rolesPolicy, (req: Request, res: Response) => {
            Roles.findOne({name: req.body.name, short: shortForRoles(req.body.name)}, (err, results) => {
                if (!err && results) {
                    res.status(200)
                        .json({
                            message: "Role already exists",
                            success: false,
                            results: results
                        })
                } else {
                    const roleReq = new Roles({
                        name: req.body.name,
                        short: shortForRoles(req.body.name),
                        description: req.body.description
                    });
                    roleReq.save((err, role) => {
                        if (!err && role) {
                            res.status(201)
                                .json({
                                    message: "Role successfully saved",
                                    success: true,
                                    results: role
                                })
                        } else {
                            res.status(500)
                                .json({
                                    message: "An error occurred while saving role",
                                    success: false,
                                    results: err
                                })
                        }
                    })
                }
            });
        });
        // delete a role endpoint
        this.app.route("/role/:id")
            .patch((req: Request, res: Response) => {
                Roles.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name: req.body.name,
                        short: shortForRoles(req.body.name),
                        description: req.body.description
                    }
                }, {new: true}, (err, results) => {
                    if (!err && results) {
                        res.status(200)
                            .json({
                                message: "Role updated successfully",
                                success: true,
                                results: results
                            })
                    } else {
                        res.status(500)
                            .json({
                                message: "An error occurred while updating role",
                                success: false,
                                results: err
                            })
                    }
                })
            })
            .delete((req: Request, res: Response) => {
                Roles.findByIdAndRemove(req.params.id, {
                    select: "name"
                }, (err, results) => {
                    if (!err && results) {
                        res.status(200)
                            .json({
                                message: "Role deleted successfully",
                                success: true,
                                results: results
                            });
                    }
                })
            });
    }

    /**
     * This configurations contains the endpoint mouthpiece
     * @return null
     */
    protected routes(): void {
        this.app.use("/api/v1", authWebService);
    }
}

export default Server;