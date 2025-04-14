import mongoose from "mongoose";
export const connectDB = async () => {
  console.log(process.env.DB)
  
  await mongoose.connect(process.env.DB as string);
  console.log("✅ MongoDB connected");
};
