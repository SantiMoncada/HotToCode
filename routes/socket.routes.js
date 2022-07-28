const ioSetup = (io) => {


    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

    io.on("connection", (socket) => {
        console.log(`Recived a socket connection from ${socket.username}`)

        socket.emit("me", socket.id)

        socket.on("message", ({ message }) => {
            socket.emit('message', { message })
        })

        socket.on("sendGuestId", (payload) => {
            io.to(payload.addressee).emit('receiveGuestId', payload)
        })

        socket.on("sendCode", (payload) => {
            io.to(payload.addressee).emit('receiveCode', payload)
        })

    });


}

module.exports = ioSetup