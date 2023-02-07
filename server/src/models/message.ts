import mongoose, { Schema, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    recipients: { type: [String], required: true },
    productId: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type IMessage = InferSchemaType<typeof messageSchema>;
const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Message, IMessage };
