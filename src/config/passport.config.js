import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { PRIVATE_KEY, cookieExtractor, validatePassword } from "../utils.js";
import userModel from "../models/user.model.js";

export const initializedPassport = () => {
  // JWT Strategy
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        secretOrKey: PRIVATE_KEY,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      },
      async (payload, done) => {
        try {
          const user = await userModel.findById(payload.user._id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Local Strategy for Login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          if (!validatePassword(password, user.password)) {
            return done(null, false, { message: "Invalid password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Local Strategy for Register
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          
          const existingUser = await userModel.findOne({ email });
          if (existingUser) {
            return done(null, false, { message: "User already exists" });
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password,
          };

          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}; 