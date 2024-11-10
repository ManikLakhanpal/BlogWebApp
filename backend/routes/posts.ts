import express from "npm:express";
import { Post, User } from "../mongoDB.ts";

const router = express.Router();
const FRONTEND = "http://localhost:3000";

// Add new post
router.post("/add", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    try {
      const newPost = new Post({
        content: req.body.content,
        createdAt: req.body.createdAt,
        email: req.body.user
      });
      console.log({
        content: req.body.content,
        createdAt: req.body.createdAt,
        email: req.body.user
      });
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      res.status(500).json({ error: `Failed to add post.\n ${error}` });
    }
  } else {
    res.redirect(`${FRONTEND}/login`);
  }
});

// Get all posts with user info
router.get("/", async (_req: express.Request, res: express.Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    const userEmails = posts.map(post => post.email);
    const users = await User.find({ email: { $in: userEmails } }).lean();
    
    const postsWithUserInfo = posts.map(post => {
      const user = users.find(user => user.email === post.email);
      return {
        _id: post._id,
        name: user?.name || "Unknown",
        email: post.email,
        uid: user?.uid,
        content: post.content,
        photo: user?.photo || "",
        createdAt: post.createdAt,
        likes: post.likes,
      };
    });
    res.json(postsWithUserInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve posts.\n" + error });
  }
});

// Delete post
router.delete("/delete/:id", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Check if the authenticated user is the author of the post
      if (post.email !== req.user?.emails?.[0]?.value) {
        return res.status(403).json({ error: "Unauthorized to delete this post" });
      }

      await post.deleteOne();
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: `Failed to delete post.\n ${error}` });
    }
  } else {
    return res.redirect(`${FRONTEND}/login`);
  }
});

export default router;
