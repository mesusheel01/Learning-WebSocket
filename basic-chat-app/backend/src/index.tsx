import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

let clientId = 1;

wss.on('connection', (socket: WebSocket) => {

    const id = clientId++;
    console.log(`Client connected with ID: ${id}`);

    socket.on('message', (message: string) => {
        console.log(`Message from client ${id}: ${message}`);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
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
