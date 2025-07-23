// /src/controllers/sessions.controller.js

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import SessionService from "../services/sessions.service.js";
import UserDTO from "../DTO/user.DTO.js";
import config from "../config/index.js";

const sessionService = new SessionService();

class SessionsController {
  async login(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        status: "error", 
        message: "Email and password are required" 
      });
    }

    try {
      const user = await sessionService.authenticateUser(email, password);
      const token = jwt.sign(
        { id: user._id, role: user.role }, 
        config.JWT_SECRET, 
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: "lax",
          maxAge: 3600000,
        })
        .json({
          status: "success",
          message: "Login successful",
          user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            num: user.num
          },
          token
        });
    } catch (error) {
      res.status(401).json({ status: "error", message: error.message });
    }
  }

  async logout(req, res) {
    res.clearCookie("token").json({ 
      status: "success", 
      message: "Logout successful" 
    });
  }

  async current(req, res) {
    try {
      const safeUser = new UserDTO(req.user);
      res.json({ status: "success", user: safeUser });
    } catch (error) {
      res.status(401).json({ status: "error", message: "User not authenticated" });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        status: "error", 
        message: "Email is required" 
      });
    }

    try {
      const resetToken = uuidv4();
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour
      
      await sessionService.setResetPasswordToken(email, resetToken, resetExpires);
      await sessionService.sendRecoveryEmail(email, resetToken);
      
      res.json({ 
        status: "success", 
        message: "Password reset email sent successfully. Check your email for instructions." 
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        status: "error", 
        message: "Token and new password are required" 
      });
    }

    try {
      await sessionService.resetPassword(token, newPassword);
      res.json({ 
        status: "success", 
        message: "Password updated successfully" 
      });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async register(req, res) {
    const { first_name, last_name, email, password, age, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ 
        status: "error", 
        message: "Missing required fields: first_name, last_name, email, password" 
      });
    }

    try {
      const createdUser = await sessionService.createUser({
        first_name,
        last_name,
        email,
        password,
        age,
        role
      });

      const token = jwt.sign(
        { id: createdUser._id, role: createdUser.role },
        config.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: "lax",
          maxAge: 3600000,
        })
        .json({
          status: "success",
          message: "User registered successfully",
          user: {
            id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            role: createdUser.role,
            num: createdUser.num
          },
          token
        });
    } catch (error) {
      console.error("❌ Error en register:", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default SessionsController; 