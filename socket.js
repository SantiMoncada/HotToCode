const setup = (app) => {
    const http = require('http');

    const server = http.createServer(app);

    const { Server } = require("socket.io");

    const ORIGIN = process.env.ORIGIN;
    const io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN || 'http://localhost:3000',
        },
    });

    require("./ioSetup")(io)

    return server;
}
module.exports = setup;