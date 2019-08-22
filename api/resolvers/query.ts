import { QueryResolvers } from "generated/resolver-types";

const Query: QueryResolvers = {
  hello(root, args, ctx) {
    return "world";
  }
};

export default Query;
