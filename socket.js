const setup = (app) => {
    const http = require('http');

    const server = http.createServer(app);

    const { Server } = require("socket.io");

    const ORIGIN = process.env.ORIGIN;
    //TODO set origin env variable
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    require("./ioSetup")(io)

    return server;
}
module.exports = setup;