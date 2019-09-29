import {
  Schema,
  model,
  PassportLocalDocument,
  PassportLocalModel
} from "mongoose";
import passport from "passport-local-mongoose";

export interface UserDocument extends PassportLocalDocument {
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  hash: string;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(passport, {
  usernameField: "email",
  usernameLowerCase: true,
  selectFields: ["_id"]
});

export default model<UserDocument, PassportLocalModel<UserDocument>>(
  "User",
  UserSchema
);
