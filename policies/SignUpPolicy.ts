import { Request, Response, NextFunction } from "express";
import * as Joi from "joi"
class SignUpPolicy {
    static registerPolicy = (req: Request, res: Response, next: NextFunction ) => {
        // Input schema from the request body
        const reqSchema = {
            name: <string> req.body.name,
            email: <string> req.body.email,
            phone: <string> req.body.phone
        };

        // definition schema for validation
        const joiSchema = Joi.object().keys({
            name: Joi.string().min(8).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            phone: Joi.number().integer().min(10).required()
        });

        const { error , value } = Joi.validate(reqSchema, joiSchema);
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
                case 'phone':
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
    }
}

export default SignUpPolicy;