import { Schema, model, Document, Types } from "mongoose";

export interface SprintDocument extends Document {
  startDate: Date;
  endDate: Date;
  tasks: Types.ObjectId[];
}

const SprintSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator(v: Date): boolean {
          return v > this.startDate;
        },
        msg: "Path `endDate` must be greater than `startDate`."
      }
    },
    tasks: {
      type: [{ type: Schema.Types.ObjectId, ref: "Task" }]
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

export default model<SprintDocument>("Sprint", SprintSchema);
