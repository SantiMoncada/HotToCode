const app = require("./app");

const server = require("./config/socket.config")(app)

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
