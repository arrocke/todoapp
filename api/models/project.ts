import { Schema, Document, model } from "mongoose";

export interface ProjectModel extends Document {
  name?: string;
}

const ProjectSchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);

export default model<ProjectModel>("Project", ProjectSchema);
