// services/taskService.js
const fs = require("fs");
const path = require("path");
const DB_PATH = path.join(__dirname, "tasks.json");

// ---- tiny error helper ----
class AppError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// ---- in-memory store with JSON persistence ----
let tasks = [];
let nextId = 1;

function load() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const data = JSON.parse(raw || "[]");
      tasks = Array.isArray(data) ? data : [];
      nextId = tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
    }
  } catch (e) {
    console.error("Failed to load tasks.json:", e);
  }
}
function save() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
  } catch (e) {
    console.error("Failed to write tasks.json:", e);
  }
}
load();

// ---- helpers ----
function normalizeTitle(t = "") {
  return t.trim().replace(/\s+/g, " ").toLowerCase();
}
function titleExists(titleNorm, excludeId = null) {
  return tasks.some(
    (t) => normalizeTitle(t.title) === titleNorm && (excludeId == null || t.id != excludeId)
  );
}

// ---- API ----
exports.createTask = (title, status = "pending") => {
  const titleNorm = normalizeTitle(title);
  if (!titleNorm) {
    throw new AppError("INVALID_TITLE", "Title cannot be empty", 400);
  }
  if (titleExists(titleNorm)) {
    throw new AppError("DUPLICATE_TITLE", "Task already exists", 409);
  }
  const task = { id: nextId++, title: title.trim().replace(/\s+/g, " "), status };
  tasks.push(task);
  save();
  return task;
};

exports.getAllTasks = ({ status = "all", q = "" } = {}) => {
  const qq = (q || "").trim().toLowerCase();
  return tasks.filter((t) => {
    const okStatus = status === "all" ? true : t.status === status;
    const okText = qq ? (t.title || "").toLowerCase().includes(qq) : true;
    return okStatus && okText;
  });
};

exports.updateTask = (id, title, status) => {
  const task = tasks.find((t) => t.id == id);
  if (!task) return null;

  if (typeof title === "string") {
    const norm = normalizeTitle(title);
    if (!norm) throw new AppError("INVALID_TITLE", "Title cannot be empty", 400);
    if (titleExists(norm, task.id)) {
      throw new AppError("DUPLICATE_TITLE", "Task already exists", 409);
    }
    task.title = title.trim().replace(/\s+/g, " ");
  }

  if (typeof status === "string") task.status = status;
  save();
  return task;
};

exports.deleteTask = (id) => {
  const idx = tasks.findIndex((t) => t.id == id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  save();
  return true;
};

// Export AppError so controller can instanceof-check if needed
exports.AppError = AppError;
