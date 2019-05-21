import {Request, Response} from "express";

class SignInController {
    static login = (req: Request, res: Response) => {
        const reqBody = {
            email: req.body.email,
            password: req.body.password
        }
    }
}

export default SignInController;