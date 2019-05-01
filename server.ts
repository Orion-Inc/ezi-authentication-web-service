"use strict";
import { default as Server } from "./app"
import http from "http";

const server = new Server();
// starting the server by doing the configurations here
server.start();
