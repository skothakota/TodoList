// index.js
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const taskRoutes = require("./routes/taskRoutes"); // <- your existing routes file

(async () => {
  try {
    // Allow the React dev server (http://localhost:5173) to call this API
    await fastify.register(cors, {
      origin: "http://localhost:5173", // adjust if your UI runs elsewhere
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,
    });

    // Register your routes (no prefix since you wanted flat URLs)
    await fastify.register(taskRoutes);

    // Optional: print all routes to verify endpoints are loaded
    fastify.ready((err) => {
      if (err) throw err;
      console.log(fastify.printRoutes());
    });

    // Start server
    const PORT = process.env.PORT || 3000;
    await fastify.listen({ port: PORT });
    fastify.log.info(`🚀 API running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
