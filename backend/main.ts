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
app.use(cors({
  origin: `${FRONTEND}`,
  credentials: true,
}));

// TODO Trust first proxy, very important for secure cookies, using vercel as proxy
// TODO app.set("trust proxy", 1); 

// Session setup
app.use(session({
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
}));

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
      done: (error: Error | null, user?: express.user) => void,
    ) => {
      return done(null, profile);
    },
  ),
);

// * GitHub Passport Strategy
passport.use(
  new GitHubStrategy({
    clientID: Deno.env.get("GITHUB_CLIENT_ID"),
    clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET"),
    callbackURL: `${BACKEND}/auth/github/callback`,
  }, (
    _accessToken: string,
    _refreshToken: string,
    profile: passport.Profile,
    done: (error: Error | null, user?: express.user) => void,
  ) => {
    return done(null, profile);
  }),
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
  }),
);

app.get('/login', (_req: express.Request, res: express.Response) => {
  console.log("err"); 
  res.send("ok");
})

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }), // ! Redirect to login on failure
  async (req: express.Request, res: express.Response) => {
    const existingUser = await User.findOne({ email: req.user?.emails[0].value });
    if (!existingUser) {
      const newUser = new User({ 
        name: req.user?.displayName,
        email: req.user?.emails[0].value,
        method: "google",
      });
      await newUser.save();
    }
    res.redirect(`${FRONTEND}/verified`); // ! Redirect to frontend on success
  },
);

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req: express.Request, res: express.Response) => { // ! Redirect to frontend on success
    const existingUser = await User.findOne({ email: req.user?.emails[0].value });
    if (!existingUser) {
      const newUser = new User({
        name: req.user?.displayName,
        email: req.user?.emails[0].value,
        method: "github",
      });
      await newUser.save();
    }
    res.redirect(`${FRONTEND}`);
  },
);

app.get("/api/user", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

app.post("/add/posts", async (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    try {
      const newPost = new Post({
        name: req.body.name,
        content: req.body.content,
        email: req.body.email,
        photo: req.body.photo,
        createdAt: req.body.createdAt
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

app.get("/posts", async (_req: express.Request, res: express.Response) => {
  const posts = await Post.find().sort({createdAt: 'desc'});
  res.json(posts);
});

app.get(
  "/auth/logout",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.logout((err: Error | null) => {
      if (err) {
        return next(err); // ! Ensure next is available
      }
      res.redirect(`${FRONTEND}`);
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});