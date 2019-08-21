export type ResolverContext = {};

export type Resolver<Obj, Value, Args = {}> = (
  obj: Obj,
  args: Args,
  context: ResolverContext
) => Value;

export type Query<Value, Args = {}> = Resolver<undefined, Value, Args>;

export type Mutation<Value, Args = {}> = Resolver<undefined, Value, Args>;
