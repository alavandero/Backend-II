import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const userController = new UserController();

// Public routes
router.post("/", userController.saveUser.bind(userController));

// Protected routes
router.get("/", authMiddleware, userController.getUsers.bind(userController));
router.get("/:id", authMiddleware, userController.getUserById.bind(userController));
router.get("/num/:num", authMiddleware, userController.getUserByNum.bind(userController));
router.get("/email/:email", authMiddleware, userController.getUserByEmail.bind(userController));

router.put("/:id", authMiddleware, userController.updateUserByID.bind(userController));
router.put("/num/:num", authMiddleware, userController.updateUserByNum.bind(userController));

router.delete("/:id", authMiddleware, userController.deleteUserByID.bind(userController));
router.delete("/num/:num", authMiddleware, userController.deleteUserByNum.bind(userController));

// Password change
router.put("/:id/password", authMiddleware, userController.changePassword.bind(userController));

export default router; 