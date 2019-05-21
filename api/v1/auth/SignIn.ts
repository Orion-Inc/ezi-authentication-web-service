import {Router} from "express";
import {default as SignInPolicy} from "@policies/SignInPolicy"
import {default as SignInController} from "@controllers/auth/SignInController"

const signInRouter = Router();
signInRouter.post('/login',
    SignInPolicy.loginPolicy, SignInController.login);

// exporting the sign in router for the mouthpiece to use
export default signInRouter;