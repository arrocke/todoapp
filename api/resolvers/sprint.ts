import { MutationResolvers, SprintResolvers, QueryResolvers } from "./types";
import TaskModel, { TaskDocument } from "../models/task";
import SprintModel from "../models/sprint";
import { asDocuments } from "../utils";

export const SprintMutation: MutationResolvers = {
  async createSprint(_, { input = {} }, { user }) {
    return await SprintModel.create({
      ...input,
      owner: user.id
    });
  },
  async updateSprint(_, { input: { id, ...fields } }, { user }) {
    const sprint = await SprintModel.findOne({ _id: id, owner: user.id });
    if (sprint) {
      sprint.set(fields);
      return await sprint.save();
    }
  },
  async addToSprint(_, { input }, { user }) {
    const [sprint, task] = await Promise.all([
      SprintModel.findOne({ _id: input.sprint, owner: user.id }),
      TaskModel.findById(input.task)
    ]);
    if (!sprint) {
      throw new Error("Sprint not found.");
    }
    if (!task) {
      throw new Error("Task not found.");
    }
    if (task.sprints.includes(sprint._id)) {
      throw new Error("Task is already in sprint.");
    } else {
      sprint.tasks.push(task._id);
      task.sprints.push(sprint._id);
      await Promise.all([sprint.save(), task.save()]);
    }
    return sprint;
  },
  async removeFromSprint(_, { input }, { user }) {
    const [sprint, task] = await Promise.all([
      SprintModel.findOne({ _id: input.sprint, owner: user.id }),
      TaskModel.findById(input.task)
    ]);
    if (!sprint) {
      throw new Error("Sprint not found.");
    }
    if (!task) {
      throw new Error("Task not found.");
    }
    if (task.sprints.includes(sprint._id)) {
      sprint.tasks = sprint.tasks.filter(t => !t.equals(task._id));
      task.sprints = task.sprints.filter(t => !t.equals(task._id));
      await Promise.all([sprint.save(), task.save()]);
    } else {
      throw new Error("Task is not in sprint.");
    }
    return sprint;
  }
};

export const SprintQuery: QueryResolvers = {
  async sprints(_, __, { user }) {
    return await SprintModel.find({ owner: user.id });
  },
  async sprint(_, { id }, { user }) {
    return await SprintModel.findOne({ _id: id, owner: user.id });
  }
};

const Sprint: SprintResolvers = {
  id: sprint => sprint._id.toHexString(),
  async tasks(sprint, { input: { status } = {} }) {
    await sprint
      .populate({
        path: "tasks",
        ...(status && { status: { $in: status } })
      })
      .execPopulate();
    return asDocuments<TaskDocument>(sprint.tasks);
  },
  async taskCount(sprint, { input: { status } = {} }) {
    return await TaskModel.find({
      sprint: sprint._id,
      ...(status && { status: { $in: status } })
    }).countDocuments();
  }
};

export default Sprint;
