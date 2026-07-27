const { createServer } = require("./app");

const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";

const server = createServer();

server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});

function shutdown() {
  console.log("Cerrando servidor...");

  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);