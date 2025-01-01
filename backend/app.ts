import express from "npm:express";
import cors from "npm:cors";
import session from "npm:express-session";
import { configurePassport } from "./config/passport.ts";
import { sessionConfig } from "./config/session.ts";
import { initializeDatabase } from "./config/database.ts";
import authRoutes from "./routes/auth.ts";
import postRoutes from "./routes/posts.ts";
import userRoutes from "./routes/users.ts";

const app = express();
const PORT = Deno.env.get("PORT");
const FRONTEND = Deno.env.get("FRONTEND");

// * Initialize database
initializeDatabase();

// * Middleware
app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(session(sessionConfig));

// * Passport configuration
const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// * Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;