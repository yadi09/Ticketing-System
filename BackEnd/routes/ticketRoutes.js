import express from "express";
import { createTicket, getAllTickets, updateTicket, viewTicket } from "../controllers/ticketController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Protect routes so only authenticated users can access
router.post("/tickets", authenticateToken, checkRole("user"), createTicket);
router.get("/tickets", authenticateToken, getAllTickets);
router.put("/tickets/:id", authenticateToken, checkRole("admin"), updateTicket);
router.get("/tickets/:id", authenticateToken, viewTicket);

export default router;
