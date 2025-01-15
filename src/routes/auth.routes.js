import { Router } from "express";
import { create, login, verifyToken } from "../controller/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/create", validateSchema(registerSchema), create);
router.get("/verifyToken",verifyToken)
router.post("/login",validateSchema(loginSchema),login );



export default router;

