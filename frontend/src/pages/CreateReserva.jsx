import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchReservas, createReserva, updateReserva, deleteReserva } from '../api/auth.js';

function CreateReserva() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [reservas, setReservas] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);

  const onSubmit = async (value) => {
    // Validate if the passenger ID exists
    const response = await fetch(`/api/pasajeros/${value.id_pasajero}`);
    if (!response.ok) {
      return alert("El ID del pasajero no existe.");
    }

    await createReserva(value);
    reset();
    loadReservas(); // Refresh the list after creating a new reservation
  };

  const onUpdate = async (value) => {
    await updateReserva(selectedReserva._id, value);
    reset();
    loadReservas(); // Refresh the list after updating a reservation
    setSelectedReserva(null); // Clear selection
  };

  const loadReservas = async () => {
    try {
      const response = await fetchReservas();
      setReservas(response.data);
    } catch (error) {
      console.error("Error fetching reservas:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteReserva(id);
    loadReservas(); // Refresh the list after deletion
  };

  const handleSelect = (reserva) => {
    setSelectedReserva(reserva);
    reset({
      id_pasajero: reserva.id_pasajero,
      fecha_reserva: reserva.fecha_reserva,
      estado_reserva: reserva.estado_reserva,
      destino: reserva.destino,
      id_vuelo: reserva.id_vuelo, // Added id_vuelo
    });
  };

  useEffect(() => {
    loadReservas(); // Load reservas on component mount
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center p-9">Crear Reserva</h1>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(selectedReserva ? onUpdate : onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="id_pasajero" className="block text-md font-semibold text-gray-700 mb-1"> ID Pasajero:</label>
            <input
              type="text"
              {...register("id_pasajero", { required: "El ID del pasajero es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.id_pasajero && <p className="text-red-500 text-sm">{errors.id_pasajero.message}</p>}
          </div>
          <div>
            <label htmlFor="fecha_reserva" className="block text-md font-semibold text-gray-700 mb-1"> Fecha Reserva:</label>
            <input
              type="date"
              {...register("fecha_reserva", { required: "La fecha es obligatoria" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.fecha_reserva && <p className="text-red-500 text-sm">{errors.fecha_reserva.message}</p>}
          </div>
          <div>
            <label htmlFor="estado_reserva" className="block text-md font-semibold text-gray-700 mb-1"> Estado Reserva:</label>
            <input
              type="text"
              {...register("estado_reserva", { required: "El estado es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.estado_reserva && <p className="text-red-500 text-sm">{errors.estado_reserva.message}</p>}
          </div>
          <div>
            <label htmlFor="destino" className="block text-md font-semibold text-gray-700 mb-1"> Destino:</label>
            <input
              type="text"
              {...register("destino", { required: "El destino es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.destino && <p className="text-red-500 text-sm">{errors.destino.message}</p>}
          </div>
          <div>
            <label htmlFor="id_vuelo" className="block text-md font-semibold text-gray-700 mb-1"> ID Vuelo:</label>
            <input
              type="text"
              {...register("id_vuelo", { required: "El ID del vuelo es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.id_vuelo && <p className="text-red-500 text-sm">{errors.id_vuelo.message}</p>}
          </div>
        </div>
        <div className="space-x-4 mt-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4"
          >
            {selectedReserva ? "Actualizar Reserva" : "Crear Reserva"}
          </button>
          <button
            type="reset"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 py-2 px-4"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-2xl font-bold mt-5">Reservas</h2>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva._id}>
              {reserva.destino} - {reserva.fecha_reserva}
              <button onClick={() => handleSelect(reserva)}>Editar</button>
              <button onClick={() => handleDelete(reserva._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateReserva;
