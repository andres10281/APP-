import mongoose from "mongoose";

const pasajeroSchema = new mongoose.Schema({
  cedula: {
    type: Number, 
    required: true, 
    unique: true, 
  },
  nombre: {
    type: String, 
    required: true,
    trim: true, 
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String, 
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "El correo no es válido"], 
  },
});

const Pasajero = mongoose.model("Pasajero", pasajeroSchema);
export default Pasajero;
