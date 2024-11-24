"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
let clientId = 1;
wss.on('connection', (socket) => {
    const id = clientId++;
    console.log(`Client connected with ID: ${id}`);
    socket.on('message', (message) => {
        console.log(`Message from client ${id}: ${message}`);
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    socket.on('close', () => {
        console.log(`Client disconnected with ID: ${id}`);
    });
    socket.on('error', (error) => {
        console.error(`Error on client ${id}:`, error);
    });
});
console.log('WebSocket server is running on ws://localhost:8000');
