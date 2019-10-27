import * as http from 'http';
import * as jwt from 'jsonwebtoken';
import * as WebSocket from 'ws';
import Player from '../Player';
import Token from '../Token';

export default (players: Player[], secretKey: string) => (ws: WebSocket, req: http.IncomingMessage) => {
    let rawToken;

    try {
        rawToken = req.headers.cookie.match(/^token=(.*)/)[1];
        jwt.verify(rawToken, secretKey);
    } catch {
        ws.send('Unauthorized');
        ws.close();
        return;
    }

    const token = jwt.decode(rawToken) as Token;
    const player = players.find(player => player.token.id === token.id);

    ws.on('close', () => {
        player.ws = null;
    });
    
    player.ws = ws;

    console.log(`Player ${player.token.username} has connected to the match server`)
    ws.send(`Hi ${player.token.username}. You are player ${players.length}`)
}