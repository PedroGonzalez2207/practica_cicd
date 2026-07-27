const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("./app");

async function startTestServer() {
  const server = createServer();

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();

  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
  };
}

async function closeServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

test("GET / responde correctamente", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "ok");
    assert.equal(body.version, "1.0.0");
  } finally {
    await closeServer(server);
  }
});

test("GET /health indica que la aplicación está saludable", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "unhealthy");
  } finally {
    await closeServer(server);
  }
});

test("una ruta inexistente devuelve 404", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/no-existe`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.error, "Ruta no encontrada");
  } finally {
    await closeServer(server);
  }
});