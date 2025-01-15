import { z } from "zod";

export const createPasajeroSchema = z.object({
  cedula: z
    .number({
      required_error: "El documento es requerido", // Corrección aquí
    }),
  nombre: z
    .string({
      required_error: "El nombre es requerido", // Corrección aquí
    }),
  apellido: z
    .string({
      required_error: "El apellido es requerido", // Corrección aquí
    }),
  telefono: z
    .string({
      required_error: "El teléfono es requerido", // Corrección aquí
    }),
  email: z
    .string({
      required_error: "El email es requerido", // Corrección aquí
    })
    .email({
      message: "El email no es válido", // Validación de formato
    }),
});
