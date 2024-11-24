"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
//create a websocketeserver server
const wss = new ws_1.WebSocketServer({ port: 8000 });
// first build the connection to the webSocket -> event handler
wss.on("connection", function (socket) {
    console.log("user connected");
    // other user when connected
    socket.on("message", (e) => {
        if (e.toString() === 'ping')
            socket.send("pong");
    });
});
