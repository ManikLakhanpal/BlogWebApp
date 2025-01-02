import MongoStore from "npm:connect-mongo";

export const sessionConfig = {
  secret: Deno.env.get("SESSION_SECRET"),
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://lakhanpalmanik:${
      Deno.env.get("ATLAS_SECRET")
    }@cluster0.07wzl.mongodb.net/sessions?retryWrites=true&w=majority`,
    ttl: 1000 * 60 * 60 * 24 * 14,
  }),
  cookie: {
    secure: Deno.env.get("NODE_ENV") === "production",
    httpOnly: false,
    sameSite: "Lax", // ! Convert to `None` for deployment
    maxAge: 1000 * 60 * 60 * 24 * 14,
  },
};
