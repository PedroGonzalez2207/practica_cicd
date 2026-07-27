const http = require("http");

function requestHandler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200);

    res.end(
      JSON.stringify({
        status: "ok",
        message: "Aplicación CI/CD funcionando",
        version: "2.0.0",
      })
    );

    return;
  }

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200);

    res.end(
      JSON.stringify({
        status: "healthy",
      })
    );

    return;
  }

  res.writeHead(404);

  res.end(
    JSON.stringify({
      error: "Ruta no encontrada",
    })
  );
}

function createServer() {
  return http.createServer(requestHandler);
}

module.exports = {
  createServer,
};