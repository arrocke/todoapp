import {
  MutationResolvers,
  TaskResolvers,
  QueryResolvers,
  TaskState
} from "./types";
import TaskModel from "../models/task";
import { asDocuments, asDocument } from "../utils";
import { SprintDocument } from "../models/sprint";
import { ProjectDocument } from "../models/project";

export const TaskMutation: MutationResolvers = {
  async createTask(
    _,
    { input: { status = TaskState.Backlog, ...input } = {} }
  ) {
    return await TaskModel.create({
      ...input,
      status
    });
  },
  async updateTask(_, { input: { id, ...fields } }) {
    const project = await TaskModel.findById(id);
    project.set(fields);
    return await project.save();
  }
};

export const TaskQuery: QueryResolvers = {
  async tasks(_, { input: { status } = {} }) {
    return await TaskModel.find({
      ...(status && { status: { $in: status } })
    });
  },
  async taskCount(_, { input: { status } = {} }) {
    return await TaskModel.find({
      ...(status && { status: { $in: status } })
    }).countDocuments();
  },
  async task(_, { id }) {
    return await TaskModel.findById(id);
  }
};

const Task: TaskResolvers = {
  id: task => task._id.toHexString(),
  async project(task) {
    await task.populate("project").execPopulate();
    return asDocument<ProjectDocument>(task.project);
  },
  async sprints(task) {
    await task.populate("sprints").execPopulate();
    return asDocuments<SprintDocument>(task.sprints);
  }
};

export default Task;
