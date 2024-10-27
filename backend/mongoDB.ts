import mongoose from "npm:mongoose";

const Schema = mongoose.Schema;
const dbURL = "mongodb://localhost:27017/Blog"; // * Specify the database name here at end of URL

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB using Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// TODO: Modify this schema to include password and new method called local
const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    method: {type: String, enum: ["google", "github"]},
    createdAt: { type: Date, default: Date.now }
});

const postSchema  = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    likes: {type: Number, default: 0},
})

const User = mongoose.model("Users", userSchema); // ! 1st Param creates a collection name called "Users"
const Post = mongoose.model("Posts", postSchema); 

export { connectDB, User, Post };
