import { MutationResolvers, UserResolvers, QueryResolvers } from "./types";
import UserModel from "../models/user";

export const UserMutation: MutationResolvers = {
  async login(_, { input: { email, password } }, context) {
    const user = await UserModel.findByUsername(email, true);
    if (user) {
      const { user: success } = await user.authenticate(password);
      context.session.userId = user.id;
      context.user = { id: user.id };
      if (success) {
        return UserModel.findById(user.id);
      }
    }
    return null;
  },
  async updateUser(_, { input: { password, ...input } }, { user }) {
    const userData = await UserModel.findById(user.id);
    userData.set(input);
    if (password) await userData.setPassword(password);
    await userData.save();
    return userData;
  }
};

export const UserQuery: QueryResolvers = {
  async user(_, __, { user }) {
    if (user) {
      return await UserModel.findById(user.id);
    } else {
      return null;
    }
  }
};

const Task: UserResolvers = {
  id: user => user._id.toHexString()
};

export default Task;
