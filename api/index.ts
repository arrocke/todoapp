import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import fs from "fs";
import path from "path";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import session from "express-session";
import storeBuilder from "connect-mongo";
import { GraphqlContext } from "context";
import { IMiddlewareFunction } from "graphql-middleware";
const MongoStore = storeBuilder(session);

dotenv.config();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Connect to database.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

const authenticationMiddleware: IMiddlewareFunction<
  any,
  GraphqlContext,
  any
> = (resolve, root, args, context, info) => {
  if (info.fieldName !== "login" && !context.user) {
    throw new Error("Not Authorized");
  } else {
    return resolve(root, args, context, info);
  }
};

// Create server and start it.
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (req): GraphqlContext => {
    return {
      session: req.request.session,
      user: req.request.session.userId
        ? {
            id: req.request.session.userId
          }
        : null
    };
  },
  middlewares: [
    {
      Query: authenticationMiddleware,
      Mutation: authenticationMiddleware
    }
  ]
});

server.express.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      touchAfter: 24 * 3600
    })
  })
);

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log("Server is running on http://localhost:4000")
);
