import { Router } from "express";
import { createReserva, getReservas, updateReserva, deleteReserva } from "../controller/reserva.controller.js";

const router = Router();

// Create a new reservation
router.post("/createReserva", createReserva);

// Get all reservations
router.get("/getReservas", getReservas);

// Update a reservation
router.put("/updateReserva/:id", updateReserva);

// Delete a reservation
router.delete("/deleteReserva/:id", deleteReserva);

export default router;
