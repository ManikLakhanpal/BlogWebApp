import express from "npm:express";
import { User, Post } from "../mongoDB.ts";

const router = express.Router();
const FRONTEND = Deno.env.get("FRONTEND");

// * Get current user
router.get("/", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

// * Update user profile
router.put("/update", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated) {
    try {
      const user = await User.updateOne(
        { email: req.user?.emails?.[0]?.value },
        { uid: req.body.uid, bio: req.body.bio, name: req.body.name }
      );
      console.log(user);
      res.json({ "User updated": user }).status(200);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.redirect(`${FRONTEND}/login`);
  }
});

// * Get user by ID or email with their posts
// ! I have to remove this thing
router.get("/api/user", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

// * Get user by ID or email with their posts
router.get("/:id", async (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  try {
    let users = await User.find({ email: req.params.id });
    let posts = await Post.find({ email: req.params.id })
      .sort({ createdAt: "desc" })
      .lean();

    console.log(users);
    if (users.length == 0) {
      users = await User.find({ uid: req.params.id });
      posts = await Post.find({ email: users[0].email })
        .sort({ createdAt: "desc" })
        .lean();
    }

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

    const userData = {
      users,
      postsWithUserInfo
    };

    console.log(userData);

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ error: `Failed to get user.\n ${error}` });
  }
});

// ? Follow user by ID
export default router;