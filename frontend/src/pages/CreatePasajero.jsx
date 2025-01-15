import { useForm } from 'react-hook-form';
import { createReques } from '../api/auth.js';

function CreatePasajero() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (value) => {
    const cedula = Number(value.cedula);
    if (isNaN(cedula)) {
      console.error("La cédula debe ser un número");
      return;
    }
    const res = await createReques({ ...value, cedula });
    console.log(res);
    reset();
  };

  return (
    <div> 
      <h1 className="text-4xl font-bold text-center p-9">Aerolinea - MERN</h1>
      <h2 className="text-4xl font-bold text-center p-3">Crear Pasajero</h2>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>

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

        {/* Botones */}
        <div className="space-x-4 mt-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4"
          >
            Crear Pasajero
          </button>

          <button
            type="reset"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 py-2 px-4"
            onClick={() => reset()}
          >
            Reset
          </button>

          <button
            type="button"
            className="text-gray-900 bg-white rounded-full border border-gray-300 focus:outline-none py-2 px-4"
            onClick={() => console.log("Función de búsqueda no implementada")}
          >
            Buscar
          </button>

          <input
            type="search"
            placeholder="Buscar cliente..."
            className="w-60 p-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
}

export default CreatePasajero;
