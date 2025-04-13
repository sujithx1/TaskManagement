import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(process.env.DB as string);
  console.log("✅ MongoDB connected");
};
