import * as Joi from "joi";
import {NextFunction, Request, Response} from "express";

class RolesPolicy {
    static rolesPolicy(req: Request, res: Response, next: NextFunction) {
        const reqBody = {
            name: req.body.name
        };
        const joiSchema = Joi.object().keys({
            name: Joi.string().min(5).required()
        });
        const {error} = Joi.validate(reqBody,joiSchema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
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

export default RolesPolicy;