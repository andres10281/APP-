import { z } from "zod";

export const createPasajeroSchema = z.object({
  cedula: z
    .number({
      required_error: "El documento es requerido", 
    }),
  nombre: z
    .string({
      required_error: "El nombre es requerido", 
    }),
  apellido: z
    .string({
      required_error: "El apellido es requerido", 
    }),
  telefono: z
    .string({
      required_error: "El teléfono es requerido", 
    }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es válido", 
    }),
});
