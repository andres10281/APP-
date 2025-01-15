import { Router } from "express";
import { createPasajero } from "../controller/pasajero.controller.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import { createPasajeroSchema } from "../schemas/pasajero.schema.js";
import { getPasajeros } from "../controller/pasajero.controller.js";
import { updatePasajero } from "../controller/pasajero.controller.js";
import { deletePasajero } from "../controller/pasajero.controller.js";

const router = Router();

router.post("/createPasajeros", validateSchema(createPasajeroSchema), createPasajero);

router.get("/getPasajeros", getPasajeros);

router.delete("/deletePasajero/:id", deletePasajero);

router.put("/updatePasajero/:id", updatePasajero);


export default router;