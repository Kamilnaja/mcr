const express = require("express");
const app = express();
const router = express.Router();
const http = require('http');
const socketIo = require("socket.io");
const path = require('path');
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('listening on * 3000');
});

io.on("connection", socket => {
    socket.join('some room');

    console.log("New client connected");
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    io.emit('some event', {
        for: 'everyone'
    });

    socket.on('chat message', msg => {
        console.log('message ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('disconnecting');
    })
})

io.on('chat message', (socket) => {
    socket.on('chat message', msg => {
        console.log('message ' + msg);
    });
});

io.sockets.emit('hi', 'evreyone');