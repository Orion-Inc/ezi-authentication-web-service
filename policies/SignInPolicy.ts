import * as Joi from "joi"
import {NextFunction, Request, Response} from "express";

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
    }
}

export default SignInPolicy;