"use strict";
import { default as app } from "./app"
import http from "http";

// starting the server by doing the configurations here
http.createServer(app).listen(app.get("PORT"), () => {
    console.log(process.env.API_NAME);
    console.log("Version Number ::->" + process.env.API_VERSION_NUMBER);
    console.log(`Server up and running: http://localhost:${app.get("PORT")}`);
});