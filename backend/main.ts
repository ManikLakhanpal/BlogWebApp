import express from "npm:express";
import cors from "npm:cors";
import session from "npm:express-session";
import passport from "npm:passport";
import GoogleStrategy from "npm:passport-google-oauth20";
import GitHubStrategy from "npm:passport-github";

const app = express();
const PORT = 5000;
const FRONTEND = "http://localhost:3000";
const BACKEND = "http://localhost:5000";

// CORS setup
app.use(cors({
  origin: `${FRONTEND}`,
  credentials: true,
}));

// Trust first proxy, very important for secure cookies, using vercel as proxy
// app.set("trust proxy", 1); 

// Session setup
app.use(session({
  secret: Deno.env.get("SESSION_SECRET"),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // true only in https
    maxAge: 1000 * 60,
  },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google Strategy
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
  done(null, user); // Save the user in the session
});

passport.deserializeUser((user: express.user, done: passport.done) => {
  done(null, user); // Retrieve the user from the session
});

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
    scope: ["profile", "email"], // Request access to profile and email
  }),
);

app.get('/login', (_req: express.Request, res: express.Response) => {
  console.log("err"); 
  res.send("ok");
})

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }), // Redirect to login on failure
  (_req: express.Request, res: express.Response) => {
    res.redirect(`${FRONTEND}`); // Redirect to frontend on success
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
  (_req: express.Request, res: express.Response) => { // Redirect to frontend on success
    res.redirect(`${FRONTEND}`);
  },
);

app.get("/api/user", (req: express.Request, res: express.Response) => {
  console.log(req.user || null);
  res.json(req.user || null);
});

app.get(
  "/auth/logout",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.logout((err: Error | null) => {
      if (err) {
        return next(err); // Ensure next is available
      }
      res.redirect(`${FRONTEND}`);
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `${Deno.env.get("SESSION_SECRET")}\n${Deno.env.get("NODE_ENV")}\n${
      Deno.env.get("GOOGLE_CLIENT_ID")
    }\n${Deno.env.get("GOOGLE_CLIENT_SECRET")}`,
  );
});