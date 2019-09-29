export interface ContextUser {
  id: string;
}

export interface GraphqlContext {
  session: Express.Session;
  user: ContextUser;
}
