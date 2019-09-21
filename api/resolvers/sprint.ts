import { MutationResolvers, SprintResolvers, QueryResolvers } from "./types";
import TaskModel, { TaskDocument } from "../models/task";
import SprintModel from "../models/sprint";
import { asDocuments } from "../utils";

export const SprintMutation: MutationResolvers = {
  async createSprint(_, { input }) {
    return await SprintModel.create(input);
  },
  async updateSprint(_, { input: { id, ...fields } }) {
    const sprint = await SprintModel.findById(id);
    sprint.set(fields);
    return await sprint.save();
  },
  async addToSprint(_, { input }) {
    const [sprint, task] = await Promise.all([
      SprintModel.findById(input.sprint),
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
  async removeFromSprint(_, { input }) {
    const [sprint, task] = await Promise.all([
      SprintModel.findById(input.sprint),
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
  async sprints() {
    return await SprintModel.find({});
  },
  async sprint(_, { id }) {
    return await SprintModel.findById(id);
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
