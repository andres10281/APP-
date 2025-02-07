import { z } from "zod";

export const createReservaSchema = z.object({
  id_pasajero: z
    .string({
      required_error: "El ID del pasajero es requerido",
    })
    .min(1, "El ID del pasajero no puede estar vacío"),
  
  fecha_reserva: z
    .string({
      required_error: "La fecha de reserva es requerida",
    })
    .refine(date => !isNaN(Date.parse(date)), {
      message: "La fecha debe ser válida",
    }),
  
  estado_reserva: z
    .string({
      required_error: "El estado de la reserva es requerido",
    })
    .default("Confirmada"), // Estado por defecto
  
  destino: z
    .string({
      required_error: "El destino es requerido",
    })
    .min(1, "El destino no puede estar vacío"),
  
  id_vuelo: z
    .string({
      required_error: "El ID del vuelo es requerido",
    })
    .min(1, "El ID del vuelo no puede estar vacío"), 
});
