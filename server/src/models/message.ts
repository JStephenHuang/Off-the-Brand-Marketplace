import mongoose, { Schema, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    buyerId: { type: String, required: true, ref: "User" },
    sellerId: { type: String, required: true, ref: "User" },
    listingId: { type: String, required: true, ref: "Listing" },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

messageSchema.post("init", (doc) => {
  // Notfication.create({type: "new-message", target: doc.receiver, seen: false})\
});

type IMessage = InferSchemaType<typeof messageSchema>;
const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Message, IMessage };
