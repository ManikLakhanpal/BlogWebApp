import express from "npm:express";
import passport from "npm:passport";
import { User } from "../mongoDB.ts";

const router = express.Router(); 
const FRONTEND = "http://localhost:3000";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
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
    res.redirect(`${FRONTEND}/verified`);
  }
);

router.get(
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

router.get("/logout", (req: express.Request, res: express.Response) => {
  req.logout((err: express.Error) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

export default router;
