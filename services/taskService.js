let tasks = [];

exports.createTask = (title, status = "pending") => {
  // 👈 Make sure "status" is included in the object
  const task = { id: tasks.length + 1, title, status };
  tasks.push(task);
  return task;
};

exports.getAllTasks = () => tasks;

exports.updateTask = (id, title, status) => {
  let task = tasks.find(t => t.id == id);
  if (!task) return null;
  if (title) task.title = title;
  if (status) task.status = status;
  return task;
};

exports.deleteTask = (id) => {
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};
