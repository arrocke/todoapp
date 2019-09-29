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
    { input: { status = TaskState.Backlog, ...input } = {} },
    { user }
  ) {
    return await TaskModel.create({
      ...input,
      status,
      owner: user.id
    });
  },
  async updateTask(_, { input: { id, ...fields } }, { user }) {
    const project = await TaskModel.findOne({ _id: id, owner: user.id });
    if (project) {
      project.set(fields);
      return await project.save();
    }
  }
};

export const TaskQuery: QueryResolvers = {
  async tasks(_, { input: { status } = {} }, { user }) {
    return await TaskModel.find({
      ...(status && { status: { $in: status } }),
      owner: user.id
    });
  },
  async taskCount(_, { input: { status } = {} }, { user }) {
    return await TaskModel.find({
      ...(status && { status: { $in: status } }),
      owner: user.id
    }).countDocuments();
  },
  async task(_, { id }, { user }) {
    return await TaskModel.findOne({ _id: id, owner: user.id });
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
