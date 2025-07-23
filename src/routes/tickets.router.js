import { Router } from "express";
import passport from "passport";
import TicketController from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", (req, res) => TicketController.getAll(req, res));
router.get("/code/:code", (req, res) => TicketController.getByCode(req, res));
router.get("/:id", (req, res) => TicketController.getById(req, res));
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => TicketController.create(req, res));
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => TicketController.update(req, res));
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => TicketController.delete(req, res));

export default router; 