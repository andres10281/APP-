import { Router } from "express";
import { createPasajero } from "../controller/pasajero.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPasajeroSchema } from "../schemas/pasajero.schema.js";
import { getPasajeros } from "../controller/pasajero.controller.js";
import { updatePasajero } from "../controller/pasajero.controller.js";
import { deletePasajero } from "../controller/pasajero.controller.js";
import { createReserva, getReservas, updateReserva, deleteReserva } from "../controller/reserva.controller.js";
import { createReservaSchema } from "../schemas/reserva.schema.js";

// Inicializar el router
const router = Router();

// Rutas para pasajeros
router.post("/createPasajeros", validateSchema(createPasajeroSchema), createPasajero);
router.get("/getPasajeros", getPasajeros);
router.delete("/deletePasajero/:id", deletePasajero);
router.put("/updatePasajero/:id", updatePasajero);

// Rutas para reservas
router.post("/createReservas", validateSchema(createReservaSchema), createReserva);
router.get("/getReservas", getReservas);
router.put("/updateReserva/:id", updateReserva);
router.delete("/deleteReserva/:id", deleteReserva);

export default router;
