import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy backend/.env.example to backend/.env and add your Atlas connection string.",
    );
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}
