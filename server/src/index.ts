import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import serviceAccount from "./firebase/serviceAccountKey.json";

import { router as usersRouter } from "./routes/users";
import { router as messagesRouter } from "./routes/messages";
import { router as listingsRouter } from "./routes/listings";

dotenv.config();

const corsConfig = {
  origin: ["http://localhost:5173", "http://192.168.2.38:5173"],
  credentials: true,
};

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

//! MongoDB

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI as string);

mongoose.connection.once("open", () => {
  console.log("Database connection established successfully.");
});

//! Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

//! Routes

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/listings", listingsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
