import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { RequestHandler } from 'express';

import Token from './Token';

export default (secretKey: string): RequestHandler => (req, res) => {
    if (req.body.username === '') {
        res.sendStatus(400);
        return;
    }

    const token: Token = {
        id: uuid(),
        username: req.body.username,
        hue: Math.floor(Math.random() * 360),
    }

    var signedToken = jwt.sign(token, secretKey);

    res.setHeader('Set-Cookie', `token=${signedToken}`);

    res.sendStatus(204);
}
