import {default as signUpRouter} from "./auth/SignUp"
import {default as signInRouter} from "./auth/SignIn"
import {Router} from "express"
import {default as authorizationGuard} from "@guards/authorizationGuard"

const auth_web_service =  Router();
auth_web_service.use("/auth", [signUpRouter, signInRouter]);

// setting up the authorization guard here
auth_web_service.use(authorizationGuard);


export default auth_web_service;


