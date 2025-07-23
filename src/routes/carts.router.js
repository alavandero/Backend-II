import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/cart.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => CartController.getAll(req, res));
router.get("/:id", (req, res) => CartController.getById(req, res));
router.post("/", passport.authenticate("jwt", { session: false }), isUser, (req, res) => CartController.create(req, res));
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => CartController.update(req, res));
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => CartController.delete(req, res));
router.post("/:id/purchase", passport.authenticate("jwt", { session: false }), isUser, (req, res) => CartController.purchase(req, res));

export default router; 