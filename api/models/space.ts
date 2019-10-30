import { Schema, Document, model, Types } from "mongoose";

export interface SpaceDocument extends Document {
  name?: string;
  owner?: Types.ObjectId;
}

const SpaceSchema = new Schema(
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

export default model<SpaceDocument>("Space", SpaceSchema);
