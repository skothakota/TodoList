// controllers/taskController.js
const taskService = require("../services/taskService");
const { AppError } = require("../services/taskService");

exports.createTask = async (req, reply) => {
  try {
    const { title, status } = req.body;
    const task = taskService.createTask(title, status);
    reply.code(201).send(task);
  } catch (err) {
    if (err instanceof AppError) {
      return reply.code(err.status).send({ code: err.code, message: err.message });
    }
    reply.code(500).send({ code: "INTERNAL_ERROR", message: "Unexpected error" });
  }
};

exports.getTasks = async (req, reply) => {
  const { status = "all", q = "" } = req.query || {};
  reply.send(taskService.getAllTasks({ status, q }));
};

exports.updateTask = async (req, reply) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedTask = taskService.updateTask(id, title, status);
    if (!updatedTask) return reply.code(404).send({ code: "NOT_FOUND", message: "Task not found" });
    reply.send(updatedTask);
  } catch (err) {
    if (err instanceof AppError) {
      return reply.code(err.status).send({ code: err.code, message: err.message });
    }
    reply.code(500).send({ code: "INTERNAL_ERROR", message: "Unexpected error" });
  }
};

exports.deleteTask = async (req, reply) => {
  const { id } = req.params;
  const deleted = taskService.deleteTask(id);
  if (!deleted) return reply.code(404).send({ code: "NOT_FOUND", message: "Task not found" });
  reply.send({ message: "Task deleted" });
};
