import { Router } from "express";
import SessionsController from "../controllers/sessions.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const sessionsController = new SessionsController();

// Public routes
router.post("/register", sessionsController.register.bind(sessionsController));
router.post("/login", sessionsController.login.bind(sessionsController));
router.post("/forgot-password", sessionsController.forgotPassword.bind(sessionsController));
router.post("/reset-password", sessionsController.resetPassword.bind(sessionsController));

// Protected routes
router.get("/current", authMiddleware, sessionsController.current.bind(sessionsController));
router.post("/logout", authMiddleware, sessionsController.logout.bind(sessionsController));

export default router; 