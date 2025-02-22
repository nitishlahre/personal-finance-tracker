import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  const mongouri = process.env.MONGO_URI;

  if (!mongouri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  await mongoose.connect(mongouri);
};

export default connectToDatabase;
