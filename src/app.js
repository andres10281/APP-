import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import pasajeroRoutes from "./routes/pasajero.routes.js";
import reservaRoutes from "./routes/reserva.routes.js"; // Added import for reservaRoutes
import cors from "cors";

const app = express();
app.use(cors(
    { 
        origin: "http://localhost:5173",
        
    }
));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Nueva ruta para la raíz
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de Aerolinea" });
});

app.use("/api", authRoutes);
app.use("/api", pasajeroRoutes);
app.use("/api", reservaRoutes);

export default app;
