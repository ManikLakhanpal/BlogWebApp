import express from "npm:express";
import cors from "npm:cors";
import session from "npm:express-session";
import passport from "npm:passport";
import GoogleStrategy from "npm:passport-google-oauth20";
import GitHubStrategy from "npm:passport-github";
import MongoStore from "npm:connect-mongo";
import { connectDB, User, Post } from "./mongoDB.ts";

connectDB();

const app = express();
const PORT = 5000;
const FRONTEND = "http://localhost:3000";
const BACKEND = "http://localhost:5000";

// * CORS setup
app.use(
  cors({
    origin: `${FRONTEND}`,
    credentials: true,
  })
);

// TODO Trust first proxy, very important for secure cookies, using vercel as proxy
// TODO app.set("trust proxy", 1);

// Session setup
app.use(
  session({
    secret: Deno.env.get("SESSION_SECRET"),
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessions",
      ttl: 1000 * 60 * 60 * 24 * 14,
    }),
    cookie: {
      secure: false, // true only in https
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// * Google Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: Deno.env.get("GOOGLE_CLIENT_ID"),
      clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: `${BACKEND}/auth/google/callback`,
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: passport.Profile,
      done: (error: Error | null, user?: express.user) => void
    ) => {
      return done(null, profile);
    }
  )
);

// * GitHub Passport Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: Deno.env.get("GITHUB_CLIENT_ID"),
      clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET"),
      callbackURL: `${BACKEND}/auth/github/callback`,
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: passport.Profile,
      done: (error: Error | null, user?: express.user) => void
    ) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: express.user, done: passport.done) => {
  done(null, user); // ! Save the user in the session
});

passport.deserializeUser((user: express.user, done: passport.done) => {
  done(null, user); // ! Retrieve the user from the session
});

app.use(express.json());

// TODO MongoDB Connection Checking + Schemes

// Routes
app.get("/", (_req: express.Request, res: express.Response) => {
  res.json("Lol");
});

app.get("/deno", (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    res.send("Deno is the best.");
  } else {
    res.send("Not revealing my secret.");
  }
});

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // ! Request access to profile and email
  })
);

app.get("/login", (_req: express.Request, res: express.Response) => {
  console.log("err");
  res.send("ok");
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }), // ! Redirect to login on failure
  async (req: express.Request, res: express.Response) => {
    const existingUser = await User.findOne({
      email: req.user?.emails[0].value,
    });
    if (!existingUser) {
      const newUser = new User({
        name: req.user?.displayName,
        email: req.user?.emails[0].value,
        photo: req.user?.photos[0].value,
        method: "google",
      });
      await newUser.save();
    }
    res.redirect(`${FRONTEND}/verified`); // ! Redirect to frontend on success
  }
);

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req: express.Request, res: express.Response) => {
    // ! Redirect to frontend on success
    const existingUser = await User.findOne({
      email: req.user?.emails[0].value,
    });
    if (!existingUser) {
      const newUser = new User({
        name: req.user?.displayName,
        email: req.user?.emails[0].value,
        photo: req.user?.photos[0].value,
        method: "github",
      });
      await newUser.save();
    }
    res.redirect(`${FRONTEND}/verified`);
  }
);

app.get("/api/user", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

app.post("/add/posts", async (req: express.Request, res: express.Response) => {
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
        email: req.user.user
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

app.put("/user/update", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated) {
    try {
      const user = await User.updateOne({ email: req.user?.emails?.[0]?.value }, { uid: req.body.uid, bio: req.body.bio, name: req.body.name });
      console.log(user);

      res.json({ "User updated": user }).status(200);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.redirect(`${FRONTEND}/login`);
  }
});

app.get("/posts", async (_req: express.Request, res: express.Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean(); // Retrieve posts
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

app.delete("/delete/post/:id", async (req: express.Request, res: express.Response) => {
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

      await post.deleteOne(); // `deleteOne` is preferred over `remove` in Mongoose 6+
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: `Failed to delete post.\n ${error}` });
    }
  } else {
    return res.redirect(`${FRONTEND}/login`);
  }
});

app.get("/user/:id", async (req: express.Request, res: express.Response) => {
  try {
    let users = await User.find({ email: req.params.id });
    let posts = await Post.find({ email: req.params.id }).sort({ createdAt: "desc" }).lean();

    console.log(users);
    if (users.length == 0) {
      users = await User.find({ uid: req.params.id });
      posts = await Post.find({ email: users[0].email }).sort({ createdAt: "desc" }).lean();
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
    }

    console.log(userData);

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ error: `Failed to get user.\n ${error}` });
  }

});

// Backend logout route example
app.get("/auth/logout", (req: express.Request, res: express.Response) => {
  req.logout((err: express.Error) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.redirect("/"); // Redirect to home page
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
