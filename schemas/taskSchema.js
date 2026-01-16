// schemas/taskSchema.js
const statusEnum = ["pending", "in-progress", "done"];

const createTaskSchema = {
  body: {
    type: "object",
    required: ["title"],
    properties: {
      title: { type: "string", minLength: 1 },
      status: { type: "string", enum: statusEnum, default: "pending" },
    },
  },
};

const updateTaskSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "integer" } },
  },
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      title: { type: "string", minLength: 1 },
      status: { type: "string", enum: statusEnum },
    },
  },
};

const deleteTaskSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "integer" } },
  },
};

const listQuerySchema = {
  querystring: {
    type: "object",
    additionalProperties: false,
    properties: {
      status: { type: "string", enum: [...statusEnum, "all"], default: "all" },
      q: { type: "string" },
    },
  },
};

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  listQuerySchema,
};
