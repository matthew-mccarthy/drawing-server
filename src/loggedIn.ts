import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

export default (secretKey: string): RequestHandler => (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        res.sendStatus(401);
        return;
    }

    try {
        jwt.verify(req.cookies.token, secretKey);
    } catch {
        res.sendStatus(401);
        return;
    }

    next();
}
