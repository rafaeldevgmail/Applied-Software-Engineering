import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true, lowercase: true },
    emailVerifiedAt: { type: Date, default: null },
    password: { type: String, default: null },
    oauth: { type: Boolean, default: false },
    rememberToken: { type: String, default: null },
  },
  { timestamps: true, versionKey: false, id: false },
);

const existingUser = mongoose.models.User as mongoose.Model<any> | undefined;

export const UserModel = existingUser ?? mongoose.model("User", userSchema);
