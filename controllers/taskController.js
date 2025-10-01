const taskService = require("../services/taskService");

exports.createTask = async (req, reply) => {
  const { title, status } = req.body;   // 👈 extract status here
  const task = taskService.createTask(title, status);
  reply.code(201).send(task);           // 👈 send full task object
};

exports.getTasks = async (req, reply) => {
  reply.send(taskService.getAllTasks());
};

exports.updateTask = async (req, reply) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const updatedTask = taskService.updateTask(id, title, status);
  if (!updatedTask) return reply.code(404).send({ message: "Task not found" });
  reply.send(updatedTask);
};

exports.deleteTask = async (req, reply) => {
  const { id } = req.params;
  const deleted = taskService.deleteTask(id);
  if (!deleted) return reply.code(404).send({ message: "Task not found" });
  reply.send({ message: "Task deleted" });
};
