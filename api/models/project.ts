import { Schema, Document, model } from "mongoose";

export interface ProjectDocument extends Document {
  name?: string;
}

const ProjectSchema = new Schema(
  {
    name: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<ProjectDocument>("Project", ProjectSchema);
