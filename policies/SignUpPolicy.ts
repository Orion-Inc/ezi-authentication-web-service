import {Request, Response, NextFunction} from "express";
import * as Joi from "joi"

class SignUpPolicy {
    static registerPolicy = (req: Request, res: Response, next: NextFunction) => {
        // Input schema from the request body
        const reqSchema = {
            name: <string> req.body.name,
            email: <string> req.body.email,
            password: <string> req.body.password,
            phone: <string> req.body.phone,
            is_basic: <boolean> req.body.is_basic,
            is_secondary: <boolean> req.body.is_secondary
        };

        // definition schema for validation
        const joiSchema = Joi.object().keys({
            name: Joi.string().min(8).required(),
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/(?=.{10,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/).min(8).required(),
            phone: Joi.number().integer().min(10).required(),
            is_basic: Joi.boolean().required(),
            is_secondary: Joi.boolean().required()
        });

        const {error} = Joi.validate(reqSchema, joiSchema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
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
                case 'phone':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
                case 'is_basic':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
                case 'is_secondary':
                    res.status(403)
                        .json({
                            message: error.details[0].message,
                            success: false
                        });
                    break;
            }
        } else {
            next();
        }
    };
    static doesSchoolExist = (role: string) => {
        return async (req: Response, res: Response, next: NextFunction) => {

        }
    }
}

export default SignUpPolicy;