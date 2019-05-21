import * as Joi from "joi"
import {default as Users} from "@models/users";
import {NextFunction, Request, Response} from "express";
import Roles from "@models/roles";

class SignInPolicy {
    static loginPolicy(req: Request, res: Response, next: NextFunction) {
        //input schema configuration here
        const bodyReq = {
            email: <string> req.body.email || <string> req.body.email_address,
            password: <string> req.body.password
        };
        // validation schema here
        const joiSchema = Joi.object().keys({
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/^[0-9A-Za-z]+$/).min(6).required()
        });

        let {error} = Joi.validate(bodyReq, joiSchema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
                case 'password':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
                default:
                    res.status(500)
                        .json({
                            message: "Undefined field name",
                            success: false
                        });
                    break;
            }
        } else {
            next();
        }
    };

    static checkRole(req: Request, res: Response, next: NextFunction) {
        Users.findOne({email: req.body.email})
            .exec((err, user) => {
                if (!err && user) {
                    // checking the role of the particular email
                    Roles.findById(user._id)
                        .exec((err, roles) => {
                            if (!err && roles) {
                                // setting the user data and the role data to the locals
                                res.locals.user = user;
                                res.locals.role = roles;
                                next();
                            } else {
                                res.status(404)
                                    .json({
                                        message: 'No role associated with this user. Contact School Admin',
                                        success: false
                                    });
                            }
                        });
                } else {
                    res.status(404)
                        .json({
                            message: "Email doesn't exist",
                            success: false
                        });
                }
            });
    }
}

export default SignInPolicy;