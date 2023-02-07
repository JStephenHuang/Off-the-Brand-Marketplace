import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    location: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

type IUser = InferSchemaType<typeof userSchema>;
const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
