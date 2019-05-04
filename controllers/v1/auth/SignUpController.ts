import { default as School } from "@models/school"
import { default as Users } from "@models/users"
import { hashPassword, generateToken  } from "@utils/resolvers";
import { Request, Response } from "express";

class SignUpController {
    static register = async (req: Request, res: Response) => {
        const schoolQuery = new School({
            name: req.body.name,
            description: req.body.description,
            motto: req.body.motto,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            website: req.body.website,
            is_basic: req.body.is_basic,
            is_secondary: req.body.is_secondary
        });
        schoolQuery.save((err,results) => {
            if (!err && results) {
                // when the school information is saved successfully, then move on to save the user credentials
                hashPassword(req.body.password).then((hashed) => {
                    const userQuery = new Users({
                        email: req.body.email,
                        password: hashed,
                        is_default: true
                    });
                    userQuery.save((err, user) => {

                    })
                });
            } else {
                res.status(500)
                    .json({
                        message: "An error occurred while saving school info",
                        success: false,
                        results: err
                    })
            }
        })
    }
}

export default SignUpController;