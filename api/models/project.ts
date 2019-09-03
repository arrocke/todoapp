import { Schema, Document, model } from "mongoose";

export interface ProjectDocument extends Document {
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

export default model<ProjectDocument>("Project", ProjectSchema);
