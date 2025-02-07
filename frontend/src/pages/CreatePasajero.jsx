import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createReques, fetchReservas, fetchPasajeros, updatePasajero, deletePasajero, createReserva } from '../api/auth.js';

function CreatePasajero() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [reservas, setReservas] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);
  const [selectedPasajero, setSelectedPasajero] = useState(null);
  const [reservaData, setReservaData] = useState({ id_pasajero: '', fecha_reserva: '', estado_reserva: '', destino: '', id_vuelo: '' });

  const onSubmit = async (value) => {
    const cedula = Number(value.cedula);
    if (isNaN(cedula)) {
      console.error("La cédula debe ser un número");
      return;
    }
    const res = await createReques({ ...value, cedula });
    console.log(res);
    reset();
    loadPasajeros(); // Refresh the list after creating a new passenger
  };

  const onUpdate = async (value) => {
    const cedula = Number(value.cedula);
    if (isNaN(cedula)) {
      console.error("La cédula debe ser un número");
      return;
    }
    await updatePasajero(selectedPasajero._id, { ...value, cedula });
    reset();
    loadPasajeros(); // Refresh the list after updating a passenger
    setSelectedPasajero(null); // Clear selection
  };

  const onCreateReserva = async () => {
    await createReserva(reservaData);
    resetReservaData(); // Reset reservation data after creation
    loadReservas(); // Refresh the list after creating a new reservation
  };

  const loadPasajeros = async () => {
    try {
      const response = await fetchPasajeros();
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error fetching pasajeros:", error);
    }
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
    await deletePasajero(id);
    loadPasajeros(); // Refresh the list after deletion
  };

  const handleSelect = (pasajero) => {
    setSelectedPasajero(pasajero);
    reset({
      cedula: pasajero.cedula,
      nombre: pasajero.nombre,
      apellido: pasajero.apellido,
      telefono: pasajero.telefono,
      email: pasajero.email,
    });
  };

  const resetReservaData = () => {
    setReservaData({ id_pasajero: '', fecha_reserva: '', estado_reserva: '', destino: '', id_vuelo: '' });
  };

  useEffect(() => {
    loadReservas();
    loadPasajeros(); // Load pasajeros on component mount
  }, []);

  return (
    <div> 
      <h1 className="text-4xl font-bold text-center p-9">Aerolinea - MERN</h1>
      <h2 className="text-4xl font-bold text-center p-3">Crear Pasajero</h2>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(selectedPasajero ? onUpdate : onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cedula" className="block text-md font-semibold text-gray-700 mb-1"> Cédula:</label>
            <input
              type="number"
              {...register("cedula", { required: "El documento es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula.message}</p>}
          </div>
          <div>
            <label htmlFor="nombre" className="block text-md font-semibold text-gray-700 mb-1"> Nombre:</label>
            <input
              type="text"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
          </div>
          <div>
            <label htmlFor="apellido" className="block text-md font-semibold text-gray-700 mb-1"> Apellido:</label>
            <input
              type="text"
              {...register("apellido", { required: "El apellido es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
          </div>
          <div>
            <label htmlFor="telefono" className="block text-md font-semibold text-gray-700 mb-1"> Teléfono:</label>
            <input
              type="text"
              {...register("telefono", { required: "El teléfono es obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-md font-semibold text-gray-700 mb-1"> Email:</label>
            <input
              type="email"
              {...register("email", { 
                required: "El email es obligatorio", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El email no es válido"
                }
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>
        <div className="space-x-4 mt-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4"
          >
            {selectedPasajero ? "Actualizar Pasajero" : "Crear Pasajero"}
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
        <h2 className="text-2xl font-bold mt-5">Pasajeros</h2>
        <ul>
          {pasajeros.map((pasajero) => (
            <li key={pasajero._id}>
              {pasajero.nombre} - {pasajero.apellido}
              <button onClick={() => handleSelect(pasajero)}>Editar</button>
              <button onClick={() => handleDelete(pasajero._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-5">Crear Reserva</h2>
        <form onSubmit={handleSubmit(onCreateReserva)}>
          <div>
            <label htmlFor="id_pasajero" className="block text-md font-semibold text-gray-700 mb-1"> ID Pasajero:</label>
            <input
              type="text"
              value={reservaData.id_pasajero}
              onChange={(e) => setReservaData({ ...reservaData, id_pasajero: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="fecha_reserva" className="block text-md font-semibold text-gray-700 mb-1"> Fecha Reserva:</label>
            <input
              type="date"
              value={reservaData.fecha_reserva}
              onChange={(e) => setReservaData({ ...reservaData, fecha_reserva: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="estado_reserva" className="block text-md font-semibold text-gray-700 mb-1"> Estado Reserva:</label>
            <input
              type="text"
              value={reservaData.estado_reserva}
              onChange={(e) => setReservaData({ ...reservaData, estado_reserva: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="destino" className="block text-md font-semibold text-gray-700 mb-1"> Destino:</label>
            <input
              type="text"
              value={reservaData.destino}
              onChange={(e) => setReservaData({ ...reservaData, destino: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="id_vuelo" className="block text-md font-semibold text-gray-700 mb-1"> ID Vuelo:</label>
            <input
              type="text"
              value={reservaData.id_vuelo}
              onChange={(e) => setReservaData({ ...reservaData, id_vuelo: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 py-2 px-4 mt-4"
          >
            Crear Reserva
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-5">Reservas</h2>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>{reserva.nombre} - {reserva.fecha}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreatePasajero;
