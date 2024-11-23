import { WebSocketServer } from "ws";

//create a websocketeserver server
const wss = new WebSocketServer({port: 8000})


// first build the connection to the webSocket -> event handler
wss.on("connection", function(socket){
    console.log("user connected")
    // other user when connected
    socket.on("message", (e)=>{
        if(e.toString())
            socket.send(e.toString())
    })
})
