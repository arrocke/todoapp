import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import fs from "fs";
import path from "path";
import resolvers from "./resolvers";
import mongoose from "mongoose";

dotenv.config();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Connect to database.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

// Create server and start it.
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log("Server is running on http://localhost:4000")
);
