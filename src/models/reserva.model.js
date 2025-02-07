import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  id_pasajero: {
    type: String,
    required: true,
  },
  fecha_reserva: {
    type: Date,
    required: true,
  },
  estado_reserva: {
    type: String,
    required: true,
    default: "Confirmada",
  },
  destino: {
    type: String,
    required: true,
  },
  id_vuelo: {
    type: String,
    required: true, 
  },
});

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;
