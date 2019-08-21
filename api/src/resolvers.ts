import {
  Project,
  queries as projectQueries,
  mutations as projectMutations
} from "./project";

export default {
  Project,
  Query: {
    ...projectQueries
  },
  Mutation: {
    ...projectMutations
  }
};
