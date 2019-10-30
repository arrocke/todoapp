import { MutationResolvers, QueryResolvers, SpaceResolvers } from "./types";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";
import SpaceModel from "../models/space";

export const SpaceMutation: MutationResolvers = {
  async createSpace(_, { input = {} }, { user }) {
    return await SpaceModel.create({
      ...input,
      owner: user.id
    });
  },
  async updateSpace(_, { input: { id, ...fields } }, { user }) {
    const space = await SpaceModel.findOne({ _id: id, owner: user.id });
    if (space) {
      space.set(fields);
      return await space.save();
    }
  }
};

export const SpaceQuery: QueryResolvers = {
  async spaces(_, {}, { user }) {
    return await SpaceModel.find({ owner: user.id });
  },
  async space(_, { id }, { user }) {
    return await SpaceModel.findOne({ _id: id, owner: user.id });
  }
};

const Space: SpaceResolvers = {
  id: space => space._id.toHexString(),
  async projects(space) {
    return await ProjectModel.find({ space: space._id });
  },
  async tasks(space, { input: { status } = {} }) {
    return await TaskModel.find({
      space: space._id,
      ...(status && { status: { $in: status } })
    });
  },
  async taskCount(space, { input: { status } = {} }) {
    return await TaskModel.find({
      space: space._id,
      ...(status && { status: { $in: status } })
    }).countDocuments();
  }
};

export default Space;
