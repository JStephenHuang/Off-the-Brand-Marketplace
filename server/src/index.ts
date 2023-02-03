import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import admin from "firebase-admin";
import serviceAccount from "./firebase/serviceAccountKey.json";

import { router as usersRouter } from "./routes/users";

dotenv.config();

const app = express();
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
