// routes/taskRoutes.js
const taskController = require("../controllers/taskController");
const {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  listQuerySchema,
} = require("../schemas/taskSchema");

async function taskRoutes(fastify) {
  fastify.post("/createTasks", { schema: createTaskSchema }, taskController.createTask);
  fastify.get("/getTasks", { schema: listQuerySchema }, taskController.getTasks);
  fastify.put("/updateTasks/:id", { schema: updateTaskSchema }, taskController.updateTask);
  fastify.delete("/deleteTasks/:id", { schema: deleteTaskSchema }, taskController.deleteTask);
}

module.exports = taskRoutes;
