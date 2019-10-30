import { Schema, Document, model, Types } from "mongoose";

export interface ProjectDocument extends Document {
  name?: string;
  space?: Types.ObjectId;
  owner?: Types.ObjectId;
}

const ProjectSchema = new Schema(
  {
    name: String,
    space: {
      type: Schema.Types.ObjectId,
      ref: "Space"
    },
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
