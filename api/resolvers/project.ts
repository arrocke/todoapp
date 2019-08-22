import {
  MutationResolvers,
  ProjectResolvers,
  QueryResolvers
} from "../generated/resolver-types";
import ProjectModel from "../models/project";

export const ProjectMutation: MutationResolvers = {
  async createProject(_, { input }) {
    return await ProjectModel.create({
      name: input.name
    });
  },
  async updateProject(_, { input: { projectId, ...fields } }) {
    const project = await ProjectModel.findById(projectId);
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
  projectId: project => project._id.toHexString()
};

export default Project;
