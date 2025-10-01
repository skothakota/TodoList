const createTaskSchema = {
  body: {
    type: "object",
    required: ["title"],
    properties: {
      title: { type: "string", minLength: 3 },
      status: { type: "string", enum: ["pending", "in-progress", "done"], default: "pending" }
    }
  }
};

const updateTaskSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3 },
      status: { type: "string", enum: ["pending", "in-progress", "done"] }
    }
  }
};

const deleteTaskSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  }
};

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema
};
