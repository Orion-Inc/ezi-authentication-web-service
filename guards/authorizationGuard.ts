import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response, Router} from "express";
import config from "../config/config"
const authorizationGuard = Router();

class JWTAuth {
    /**
     * Class definition for checking the token sent per request
     * @param req
     * @param res
     * @param next
     */
    static checkToken = (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
        if (token) {
            jwt.verify(token, config.secret,{
                algorithms: ['HS256']
            }, (err, decoded) => {
                if (err) {
                    res.status(401)
                        .json({
                            message: 'Authentication failed. Session Expired',
                            success: false,
                            results: err
                        })
                } else {
                    res.locals.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403)
                .json({
                    message: 'No token provided',
                    success: false
                });
        }
    }
}

authorizationGuard.use(JWTAuth.checkToken);

export default authorizationGuard;

