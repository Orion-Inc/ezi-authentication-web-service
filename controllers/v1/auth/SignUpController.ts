import {default as School} from "@models/school"
import {default as Users} from "@models/users"
import {default as Roles} from "@models/roles"
import {hashPassword, generateToken} from "@utils/resolvers";
import {Request, Response} from "express";

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
        schoolQuery.save((err, results) => {
            if (!err && results) {
                // when the school information is saved successfully, then move on to save the user credentials
                Roles.findOne({ short: "sa" }, (err,results) => {

                });
                hashPassword(req.body.password).then((hashed) => {
                    const userQuery = new Users({
                        email: req.body.email,
                        password: hashed,
                        role_id: '',
                        is_default: true
                    });
                    userQuery.save((err, user) => {
                        if (!err && user) {
                            // generate a token and send it to the user to verify the accounts
                            let token = generateToken(10000, 99999);
                            res.status(201)
                                .json({
                                    message: "School cloud space successfully crafted." +
                                        "An email has been sent to confirm your accounts",
                                    success: true,
                                    results: user
                                })
                        } else {
                            res.status(500)
                                .json({
                                    message: "An error occurred while saving login credentials",
                                    success: false,
                                    results: err
                                });
                        }
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