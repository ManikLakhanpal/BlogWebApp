import { connectDB, User, Post } from "../mongoDB.ts";

export const initializeDatabase = async () => {
  await connectDB();
};

export { User, Post };