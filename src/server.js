const express = require("express");
const app = express();
const http = require('http');
const socketIo = require("socket.io");
const path = require('path');
const server = http.createServer(app);
const io = socketIo(server);
const port = 8080;

app.use(express.static(path.join(__dirname, 'front/build')))
console.log(__dirname);

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/front/build/index.html`))
})

server.listen(port, () => {
    console.log(`${port}`);
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

