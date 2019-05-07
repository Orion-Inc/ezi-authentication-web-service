import { Router } from "express";
import { default as SignUpPolicy } from "@policies/SignUpPolicy"
import { default as SignUpController } from "@controllers/auth/SignUpController"

const signUpRouter = Router();
signUpRouter.post('/signup',
    [SignUpPolicy.registerPolicy, SignUpPolicy.doesSchoolExist],
    SignUpController.register
    );


// exporting the default configuration modules to be used by the aws
export default signUpRouter;
