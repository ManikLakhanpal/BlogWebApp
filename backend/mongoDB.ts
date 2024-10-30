import mongoose from "npm:mongoose";

const Schema = mongoose.Schema;
const dbURL = "mongodb://localhost:27017/Blog"; // * Specify the database name here at end of URL

async function connectDB() {
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
  email: { type: String, unique: true, required: true },
  photo: { type: String, required: false, default: "https://w16manik.blr1.cdn.digitaloceanspaces.com/Luffy.jpeg" },
  method: { type: String, enum: ["google", "github"] },
  posts: { type: Number, default: 0},
  followers: {type: Number, default: 0},
  following: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  content: { type: String, required: true, maxlength: 150 },
  createdAt: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  email: { type: String, required: true },  // Using email to link to the user
});

const User = mongoose.model("Users", userSchema); // ! 1st Param creates a collection name called "Users"
const Post = mongoose.model("Posts", postSchema);

export { connectDB, User, Post };
