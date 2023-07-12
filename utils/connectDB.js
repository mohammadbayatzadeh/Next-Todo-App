import mongoose from "mongoose";

const conncetDB = async () => {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to db");
};

export default conncetDB;
