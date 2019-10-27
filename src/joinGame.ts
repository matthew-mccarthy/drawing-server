import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

import Token from './Token';
import Player from './Player';

const MAXIMUM_PLAYERS = parseInt(process.env.MAXIMUM_PLAYERS, 10);

export default (players: Player[]): RequestHandler => (req, res) => {
    const token = jwt.decode(req.cookies.token) as Token;

    if (players.length === MAXIMUM_PLAYERS) {
        res.status(503).send('The server is full');
        return;
    }

    if (!players.some(player => player.token.id === token.id)) {
        console.log(`Player ${token.username} has joined`);
        players.push({ token, ws: null });
    }

    res.send(`Welcome back ${token.username}`);
}
