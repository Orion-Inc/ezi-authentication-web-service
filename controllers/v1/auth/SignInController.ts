import {Request, Response} from "express";

class SignInController {
    static login = async (req: Request, res: Response) => {
        // getting the values from the locals in the res value
        res.status(200)
            .json({
                message: 'Token generated successfully',
                success: true,
                results: res.locals.user
            })
    }
}

export default SignInController;