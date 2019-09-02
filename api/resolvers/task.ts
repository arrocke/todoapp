import { MutationResolvers, TaskResolvers, QueryResolvers } from "./types";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";

export const TaskMutation: MutationResolvers = {
  async createTask(_, { input }) {
    return await TaskModel.create(input);
  },
  async updateTask(_, { input: { id, ...fields } }) {
    const project = await TaskModel.findById(id);
    project.set(fields);
    return await project.save();
  }
};

export const TaskQuery: QueryResolvers = {
  async tasks() {
    return await TaskModel.find({});
  },
  async task(_, { id }) {
    return await TaskModel.findById(id);
  }
};

const Task: TaskResolvers = {
  id: task => task._id.toHexString(),
  async project(task) {
    if (task.project) {
      return await ProjectModel.findById(task.project);
    }
  }
};

export default Task;
