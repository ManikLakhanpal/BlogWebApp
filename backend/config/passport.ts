import passport from "npm:passport";
import GoogleStrategy from "npm:passport-google-oauth20";
import GitHubStrategy from "npm:passport-github";
import express from "npm:express";

// * This will get `Backend` url from the env
const BACKEND = Deno.env.get("BACKEND");

// * This configuration is for `Google` and `Github` OAuth methods.
export const configurePassport = () => {
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

// * Stores data of user into the session
  passport.serializeUser((user: express.user, done: passport.done) => {
    done(null, user);
  });

  // * Retrieves data of user from the session
  passport.deserializeUser((user: express.user, done: passport.done) => {
    done(null, user);
  });

  return passport;
};
