import { MutationResolvers, ProjectResolvers, QueryResolvers } from "./types";
import ProjectModel from "../models/project";
import TaskModel from "../models/task";
import { SpaceDocument } from "models/space";
import { asDocument } from "../utils";

export const ProjectMutation: MutationResolvers = {
  async createProject(_, { input = {} }, { user }) {
    return await ProjectModel.create({ ...input, owner: user.id });
  },
  async updateProject(_, { input: { id, ...fields } }, { user }) {
    const project = await ProjectModel.findOne({ _id: id, owner: user.id });
    if (project) {
      project.set(fields);
      return await project.save();
    }
  }
};

export const ProjectQuery: QueryResolvers = {
  async projects(_, __, { user }) {
    return await ProjectModel.find({ owner: user.id });
  },
  async project(_, { id }, { user }) {
    return await ProjectModel.findOne({ _id: id, owner: user.id });
  }
};

const Project: ProjectResolvers = {
  id: project => project._id.toHexString(),
  async space(project) {
    await project.populate("space").execPopulate();
    return asDocument<SpaceDocument>(project.space);
  },
  async tasks(project, { input: { status } = {} }) {
    return await TaskModel.find({
      project: project._id,
      ...(status && { status: { $in: status } })
    });
  },
  async taskCount(project, { input: { status } = {} }) {
    return await TaskModel.find({
      project: project._id,
      ...(status && { status: { $in: status } })
    }).countDocuments();
  }
};

export default Project;
