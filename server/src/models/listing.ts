import mongoose, { Schema, InferSchemaType } from "mongoose";

const listingSchema = new Schema(
  {
    headline: { type: String },
    institution: { type: String },
    size: { type: String },
    type: { type: String },
    condition: { type: String },
    gender: { type: String },
    description: { type: String },
    price: { type: Number },
    seller: { type: String, ref: "User", unique: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type IListing = InferSchemaType<typeof listingSchema>;
const Listing = mongoose.model<IListing>("Listing", listingSchema);

export { Listing, IListing };
