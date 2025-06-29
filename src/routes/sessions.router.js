import { Router } from "express";
import passport from "passport";
import { generateToken, createHash } from "../utils.js";
import userModel from "../models/user.model.js";

const router = Router();

// Register endpoint
router.post("/register", 
  passport.authenticate("register", { session: false }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ error: "Registration failed" });
      }

      // Hash the password before saving
      req.user.password = createHash(req.user.password);
      await req.user.save();

      const userResponse = req.user.toObject();
      delete userResponse.password;

      const access_token = generateToken(userResponse);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.status(201).json({ 
        message: "User registered successfully", 
        user: userResponse 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Login endpoint
router.post("/login", 
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const userResponse = req.user.toObject();
      delete userResponse.password;

      const access_token = generateToken(userResponse);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({ 
        message: "Login successful", 
        user: userResponse 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Current endpoint - validates logged user and returns data
router.get("/current", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authorized. Please login" });
      }

      const userResponse = req.user.toObject();
      delete userResponse.password;

      res.json({ 
        message: "Current user data", 
        user: userResponse 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logout successful" });
});

export default router; 