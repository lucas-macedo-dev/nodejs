const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app       = express();
const server    = http.createServer(app);
const io        = socketIo(server);

let messageHistory = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    // Envie o histórico de mensagens ao usuário que se conectou
    socket.emit('message history', messageHistory);

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });

    socket.on('chat message', (msg) => {
        messageHistory.push(msg);
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});