import * as WebSocket from 'ws';
import Token from './Token';

export default interface Player {
    token: Token,
    ws: WebSocket
}