// index.js
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const taskRoutes = require("./routes/taskRoutes");

(async () => {
  try {
    await fastify.register(cors, {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,
    });

    // Health
    fastify.get("/health", async () => ({ ok: true }));

    // Register routes
    await fastify.register(taskRoutes);

    // Print routes
    await fastify.ready();
    fastify.log.info(fastify.printRoutes());

    const PORT = process.env.PORT || 3000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`🚀 API running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
