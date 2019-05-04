import { default as School } from "@models/school"
import { default as Users } from "@models/users"
import { hashPassword, generateToken  } from "@utils/resolvers";
import { Request, Response } from "express";

class SignUpController {
    static register = async (req: Request, res: Response) => {
        const schoolInfo = {
            name: req.body.name,
            description: req.body.description,
            motto: req.body.motto,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            website: req.body.website,
            is_basic: req.body.is_basic,
            is_secondary: req.body.is_secondary
        }
    }
}

export default SignUpController;