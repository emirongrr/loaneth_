import mongoose from "mongoose";

const uri: string | undefined =
  process.env.MONGODB_URI || "mongodb://localhost:27017/todo";

export const mongoConnect = async () => {
  try {
    const { connection }: any = await mongoose.connect(uri);
    if (connection.readyState === 1) {
      return connection.asPromise();
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};