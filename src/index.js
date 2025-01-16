import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./dbs.js";
import { PORT } from "./config.js"; 

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




