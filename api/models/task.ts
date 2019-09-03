import { Schema, Document, model, Types } from "mongoose";

export interface TaskDocument extends Document {
  name?: string;
  project?: Types.ObjectId;
  sprints: Types.ObjectId[];
}

const TaskSchema = new Schema(
  {
    name: String,
    status: {
      type: String,
      enum: ["backlog", "todo", "progress", "complete"],
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true
  }
);

export default model<TaskDocument>("Task", TaskSchema);
