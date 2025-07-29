const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const { users } = require("../models/user.model");
const { eq } = require("drizzle-orm");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, jwtPayload.id));

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
