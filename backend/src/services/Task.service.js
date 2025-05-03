const httpStatus = require("http-status");
const { UserModel, TaskModel } = require("../models");
const { ApiError } = require("../utils/ApiError");

class TaskService {
  static async addTask(body, user) {
    const { title, desc } = body;
  
    // Count existing tasks for this user
    const taskCount = await TaskModel.countDocuments({ user });
  
    if (taskCount >= 4) {
      throw new ApiError(httpStatus.BAD_REQUEST, "You can only have up to 4 tasks at a time.");
    }
  
    await TaskModel.create({
      user,
      title,
      description: desc,
    });
  
    return {
      msg: "Task Added",
    };
  }

  static async getAllTask(user) {
    const tasks = await TaskModel.find({ user });

    return {
      tasks,
      total: tasks.length,
    };
  }

  static async deleteById(user, id) {
    const task = await TaskModel.findOneAndDelete({ user, _id: id });

    if (!task) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Task not found or not authorized");
    }

    return {
      msg: "Task Deleted",
    };
  }

  static async editTaskById(user, id) {
    const task = await TaskModel.findOneAndUpdate(
      { user, _id: id },
      { isComplete: true },
      { new: true }
    );

    if (!task) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Task not found or not authorized");
    }

    return {
      msg: "Task Updated!!",
      task,
    };
  }
}

module.exports = TaskService;
