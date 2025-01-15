import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde .env

import app from "./app.js";
import { connectDB } from "./dbs.js";
import { PORT } from "./config.js"; // Importa PORT

async function main() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Mongodb conexión fallida");
    }
}
main();




