const taskController = require("../controllers/taskController");
const {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} = require("../schemas/taskSchema");

async function taskRoutes(fastify, options) {
  fastify.post(
    "/createTasks",
    { schema: createTaskSchema },
    taskController.createTask
  );
  fastify.get("/getTasks", taskController.getTasks);
  fastify.put(
    "/updateTasks/:id",
    { schema: updateTaskSchema },
    taskController.updateTask
  );
  fastify.delete(
    "/deleteTasks/:id",
    { schema: deleteTaskSchema },
    taskController.deleteTask
  );
}

module.exports = taskRoutes;
