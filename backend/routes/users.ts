import express from "npm:express";
import { Post, User } from "../mongoDB.ts";

const router = express.Router();
const FRONTEND = Deno.env.get("FRONTEND");

// * Get current user
router.get("/", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

// * Update user profile
router.put("/update", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.updateOne(
        { email: req.user?.emails?.[0]?.value },
        { uid: req.body.uid, bio: req.body.bio, name: req.body.name },
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

    const postsWithUserInfo = posts.map((post) => {
      const user = users.find((user) => user.email === post.email);
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
      postsWithUserInfo,
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

// * Follow user by email
router.patch("/follow/", async (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) {
      try {
        // ! Data of target
        const { name, email } = req.body;
        const target = await User.find({ email: email });
        const current = await User.find({
          email: req.user?.emails?.[0]?.value,
        });

        // * 1. Check if target exists
        if (!target || !current) {
          console.error(`![SERVER] : User not found`);
          return res.json({ message: "User not found" });
        }

        // * 2. Check if target == current
        if (target === current) {
          res.json({ message: "You cannot follow yourself" });
        }

        // * 3. Check if already following
        const isFollowing = current[0].following.some((user) =>
          user.email === email
        );
        if (isFollowing) {
          console.error(`![SERVER] : User is already being followed`);
          return res.json({ message: "User is already being followed" });
        } else {
          // ! Create follow data objects
          const followData = {
            name: target[0].name,
            email: target[0].email,
            photo: target[0].photo,
          };

          const followerData = {
            name: current[0].name,
            email: current[0].email,
            photo: current[0].photo,
          };

          // ! Update current user's following array
          await User.findOneAndUpdate(
            { email: current[0].email },
            {
              $addToSet: {
                following: followData,
              },
            },
          );

          // ! Update target user's followers array
          await User.findOneAndUpdate(
            { email: target[0].email },
            {
              $addToSet: {
                followers: followerData,
              },
            },
          );

          console.log(
            `[SERVER] : User ${current[0].email} followed ${target[0].email}`,
          );
          return res.json({
            message: `Successfully followed user ${name}`,
            followData,
          });
        }
      } catch (err) {
        console.error(
          `~[SERVER] : Error Occurred while following user\n${err}`,
        );
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.redirect(`${FRONTEND}/login`);
    }
  },
);

router.patch( "/unfollow/", async (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) {
      try {
        // ! Data of target
        const { name, email } = req.body;
        const target = await User.find({ email: email });
        const current = await User.find({
          email: req.user?.emails?.[0]?.value,
        });

        // * 1. Check if target exists
        if (!target || !current) {
          console.error(`![SERVER] : User not found`);
          return res.json({ message: "User not found" });
        }

        // * 2. Check if target == current
        if (target === current) {
          res.json({ message: "You cannot unfollow yourself" });
        }

        // * 3. Check if already following
        const isFollowing = current[0].following.some((user) =>
          user.email === email
        );
        if (!isFollowing) {
          console.error(`![SERVER] : User is already unfollowed.`);
          return res.json({ message: "User is already unfollowed." });
        } else {
          // ! Create follow data objects
          const followData = {
            name: target[0].name,
            email: target[0].email,
            photo: target[0].photo,
          };

          const followerData = {
            name: current[0].name,
            email: current[0].email,
            photo: current[0].photo,
          };

          // ! Update current user's following array
          await User.findOneAndUpdate(
            { email: current[0].email },
            {
              $pull: {
                following: followData,
              },
            },
          );

          // ! Update target user's followers array
          await User.findOneAndUpdate(
            { email: target[0].email },
            {
              $pull: {
                followers: followerData,
              },
            },
          );

          console.log(
            `[SERVER] : User ${current[0].email} unfollowed ${target[0].email}`,
          );
          return res.json({
            message: `Successfully unfollowed user ${name}`,
            followData,
          });
        }
      } catch (err) {
        console.error(
          `~[SERVER] : Error Occurred while unfollowing user\n${err}`,
        );
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.redirect(`${FRONTEND}/login`);
    }
  },
);

export default router;
