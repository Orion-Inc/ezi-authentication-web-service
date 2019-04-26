import { default as School } from "@models/school"
import { default as Users } from "@models/users"
import { hashPassword, generateToken  } from "@utils/resolvers";
import { Request, Response } from "express";

class SignUpController {
    static register = async (req: Request, res: Response) => {

    }
}

export default SignUpController;