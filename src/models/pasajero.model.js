import mongoose from "mongoose";

const pasajeroSchema = new mongoose.Schema({
  cedula: {
    type: Number, // Cambiado a Number (tipo válido de Mongoose)
    required: true, // Cambiado de 'require' a 'required'
    unique: true, // Opcional: garantiza que la cédula sea única
  },
  nombre: {
    type: String, // Cambiado a String (tipo válido de Mongoose)
    required: true,
    trim: true, // Elimina espacios en blanco al inicio y final
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String, // Cambiado a String, ya que los números de teléfono pueden incluir símbolos
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Asegura que los correos sean únicos
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "El correo no es válido"], // Validación de formato de email
  },
});

const Pasajero = mongoose.model("Pasajero", pasajeroSchema);
export default Pasajero;
