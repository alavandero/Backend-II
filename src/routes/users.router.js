import { Router } from "express";
import userModel from "../models/user.model.js";
import { createHash } from "../utils.js";
import passport from "passport";

const router = Router();

// Get all users (protected route)
router.get("/", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await userModel.find({}, { password: 0 });
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user by ID (protected route)
router.get("/:id", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id, { password: 0 });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Create user (admin only)
router.post("/", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admin role required." });
      }

      const { first_name, last_name, email, age, password, role } = req.body;
      
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = createHash(password);

      const newUser = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role: role || 'user'
      });

      const userResponse = newUser.toObject();
      delete userResponse.password;

      res.status(201).json({ user: userResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update user (admin or own user)
router.put("/:id", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, age, role } = req.body;

      // Check if user can update this profile
      if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        return res.status(403).json({ error: "Access denied" });
      }

      const updateData = {};
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;
      if (email) updateData.email = email;
      if (age) updateData.age = age;
      if (role && req.user.role === 'admin') updateData.role = role;

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete user (admin only)
router.delete("/:id", 
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admin role required." });
      }

      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router; 