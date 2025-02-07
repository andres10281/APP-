
import Reserva from "../models/reserva.model.js";

// Crear una reserva
// POST http://localhost:4000/api/createReserva
import pasajero from "../models/pasajero.model.js"; // Import the pasajero model

export const createReserva = async (req, res) => {
  try {
    const { id_pasajero, fecha_reserva, estado_reserva, destino, id_vuelo } = req.body; // Added id_vuelo

    // Validate if the passenger ID exists
    const existingPasajero = await pasajero.findById(id_pasajero);
    if (!existingPasajero) {
      return res.status(400).json({ message: "El ID del pasajero no existe." });
    }


    const newReserva = new Reserva({
      id_pasajero,
      fecha_reserva,
      estado_reserva,
      destino,
      id_vuelo, 
    });

    const savedReserva = await newReserva.save();
    res.status(201).json(savedReserva);
  } catch (error) {
    console.error("Error al guardar reserva:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
// GET http://localhost:4000/api/getReservas
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una reserva
// PUT http://localhost:4000/api/updateReserva/:id
export const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReserva = await Reserva.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedReserva);
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reserva
// DELETE http://localhost:4000/api/deleteReserva/:id
export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await Reserva.findByIdAndDelete(id);
    res.status(204).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ message: error.message });
  }
};
