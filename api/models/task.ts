import { Schema, Document, model, Types } from "mongoose";

export interface TaskModel extends Document {
  name?: string;
  project?: Types.ObjectId;
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

export default model<TaskModel>("Task", TaskSchema);
