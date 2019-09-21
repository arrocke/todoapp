import { MutationResolvers, ProjectResolvers, QueryResolvers } from "./types";
import ProjectModel from "../models/project";
import TaskModel from "../models/task";

export const ProjectMutation: MutationResolvers = {
  async createProject(_, { input }) {
    return await ProjectModel.create(input);
  },
  async updateProject(_, { input: { id, ...fields } }) {
    const project = await ProjectModel.findById(id);
    project.set(fields);
    return await project.save();
  }
};

export const ProjectQuery: QueryResolvers = {
  async projects() {
    return await ProjectModel.find({});
  },
  async project(_, { id }) {
    return await ProjectModel.findById(id);
  }
};

const Project: ProjectResolvers = {
  id: project => project._id.toHexString(),
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
