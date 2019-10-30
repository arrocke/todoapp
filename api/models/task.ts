import { Schema, Document, model, Types } from "mongoose";
import { asDocument } from "../utils";
import { ProjectDocument } from "./project";

export interface TaskDocument extends Document {
  name?: string;
  space?: Types.ObjectId;
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
    space: {
      type: Schema.Types.ObjectId,
      ref: "Space"
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      validate: {
        async validator(): Promise<boolean> {
          console.log(this);
          await this.populate("project").execPopulate();
          return this.project && this.space.equals(this.project.space);
        },
        msg: "Task's project is not in the task's space."
      }
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

TaskSchema.pre<TaskDocument>("validate", async function() {
  // Set the space to the project's space if not modified.
  if (this.isModified("project") && !this.isModified("space")) {
    await this.populate("project").execPopulate();
    const project = asDocument<ProjectDocument>(this.project);
    if (project) {
      this.space = project.space;
    }
  }
  // Clear project if space changed.
  else if (this.isModified("space") && !this.isModified("project")) {
    this.project = null;
  }
});

export default model<TaskDocument>("Task", TaskSchema);
