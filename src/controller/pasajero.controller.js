import pasajero from "../models/pasajero.model.js";


// http://localhost:4000/api/createPasajero
export const createPasajero = async (req, res) => {
    try {
      const { cedula, nombre, apellido, telefono, email } = req.body;
  
      console.log("Datos recibidos:", { cedula, nombre, apellido, telefono, email });
  
      const newPasajero = new pasajero({
        cedula,
        nombre,
        apellido,
        telefono,
        email,
      });
  
      const savedPasajero = await newPasajero.save();
  
      console.log("Pasajero guardado:", savedPasajero);
  
      res.status(201).json(savedPasajero);
    } catch (error) {
      console.error("Error al guardar pasajero:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  //http://localhost:4000/api/getPasajeros
  export const getPasajeros = async (req, res) => {
    try {
      const pasajeros = await pasajero.find();
      res.status(200).json(pasajeros);
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
      res.status(500).json({ message: error.message });
    }
  }

//http://localhost:4000/api/updatePasajero
  export const updatePasajero = async (req, res) => {
    try {
      const { cedula, nombre, apellido, telefono, email } = req.body;
      const { id } = req.params;
  
      const updatedPasajero = await pasajero.findByIdAndUpdate( id,
         { cedula, nombre, apellido, telefono, email }, { new: true });
      res.status(200).json(updatedPasajero);
    } catch (error) { 
      console.error("Error al actualizar pasajero:", error);
      res.status(500).json({ message: error.message });
    } 
    };

//http://localhost:4000/api/deletePasajero
export const deletePasajero = async (req, res) => {
    try {
      const { id } = req.params;
      await pasajero.findByIdAndDelete(id);
      res.status(204).json({ message: "Pasajero eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar pasajero:", error);
      res.status(500).json({ message: error.message });
    }
  };

