const { token } = require('morgan');
const WebSocket = require('ws');

function onError(ws, err) {
    console.log(`onError: ${data}`);

}

function onMessage(ws, data) {
    console.log(`Mensagem Recebida: ${data}`);
    ws.send(`Mensagem Enviada -> ${data}`);
}

function onConnection(ws, req) {
    ws.on('message', (data) => {
        onMessage(ws, data);
    });
    ws.on('error', (err) => {
        onError(ws, err);
    });
    console.log(`onConnection: ${req.url}`);
}

function broadcast(jsonObject) {
    if (!this.clients) return;

    this.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });

}


function corsValidation(origin) {
    return process.env.CORS_ORIGIN === '*' || process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
    if (!corsValidation(info.origin)) return callback(false);

    const token = info.req.url.split('token=')[1];

    if (token) {
        if (token === '123456')
            return callback(true);
    }
    return callback(false);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server,
        verifyClient
    });
    wss.on('connection', onConnection);
    wss.broadcast = broadcast;

    console.log('App Web Sockets is running!');
    return wss;
};