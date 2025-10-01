const fastify = require("fastify")({ logger: true });
const taskRoutes = require("./routes/taskRoutes");

const start = async () => {
  try {
    await fastify.register(taskRoutes);

    // Debug: Print all registered routes
    fastify.ready(err => {
      if (err) throw err;
      console.log(fastify.printRoutes());
    });

    await fastify.listen({ port: 3000 });
    fastify.log.info(`🚀 Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
