import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response, Router} from "express";
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

        }
    }
}

authorizationGuard.use(JWTAuth.checkToken);

export = authorizationGuard;

