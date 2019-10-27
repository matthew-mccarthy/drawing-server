require('dotenv').config();

import * as bodyparser from 'body-parser';
import * as cookieparser from 'cookie-parser';
import * as express from 'express';
import * as http from 'http';
import { v4 as uuid } from 'uuid';
import * as WebSocket from 'ws';

import joinGame from './joinGame';
import loggedIn from './loggedIn';
import login from './login';
import register from './ws/register';
import Player from './Player';

const secretKey = uuid().replace('-', '');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players: Player[] = [];

app.use(bodyparser.json());
app.use(cookieparser());

app.post('/login', login(secretKey));
app.use(loggedIn(secretKey));

app.get('/join', joinGame(players));

wss.on('connection', register(players, secretKey));

server.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`));
