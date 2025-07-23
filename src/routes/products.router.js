import { Router } from "express";
import passport from "passport";
import ProductController from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => ProductController.getAll(req, res));
router.get("/code/:code", (req, res) => ProductController.getByCode(req, res));
router.get("/:id", (req, res) => ProductController.getById(req, res));
router.post("/", passport.authenticate("jwt", { session: false }), isAdmin, (req, res) => ProductController.create(req, res));
router.put("/:id", passport.authenticate("jwt", { session: false }), isAdmin, (req, res) => ProductController.update(req, res));
router.delete("/:id", passport.authenticate("jwt", { session: false }), isAdmin, (req, res) => ProductController.delete(req, res));

export default router; 