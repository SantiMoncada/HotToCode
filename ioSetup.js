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
        console.log(socket.username)
        console.log('recived Conection')

        socket.emit("me", socket.id)

        socket.on("message", ({ message }) => {
            console.log(message)
            socket.emit('message', { message })
        })

        socket.on("sendGuestId", (payload) => {
            console.log('getting user id on server ', payload)
            io.to(payload.addressee).emit('receiveGuestId', payload)
        })

        socket.on("sendCode", (payload) => {
            io.to(payload.addressee).emit('receiveCode', payload)
        })

    });


}

module.exports = ioSetup