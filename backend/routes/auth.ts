import express from "npm:express";
import passport from "npm:passport";
import {User} from "../mongoDB.ts";

const authRoutes = express.Router();
const FRONTEND = Deno.env.get("FRONTEND");

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

authRoutes.delete("/logout", (req: express.Request, res: express.Response) => {
  req.logOut((err: express.Error) => { // ? it's logOut not logout
    if (err) {
      console.log({ error: "Error logging out" });
      return res.status(500).json({ error: "Error logging out" });
    }
    console.log({ message: "Logged out successfully" });
    res.clearCookie("connect.sid"); // Clear session cookie
    res.clearCookie("user"); // Clear user cookie
    res.json({ message: "Logged out successfully" });
  });
});

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
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
    console.log(
      `~[SERVER] : ${req.user?.emails[0].value} just logged using google`,
    );
    res.redirect(`${FRONTEND}/verified`);
  },
);

authRoutes.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

authRoutes.get(
  "/github/callback",
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
    console.log(
      `~[SERVER] : ${req.user?.emails[0].value} just logged using github`,
    );
    res.redirect(`${FRONTEND}/verified`);
  },
);

export default authRoutes;
