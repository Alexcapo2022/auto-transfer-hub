import { z } from "zod";

export type Comprobante = "boleta" | "factura";
export type DocBoleta = "DNI" | "CE";

export type FormState = {
  cod_serv: string;
  comprobante: Comprobante;

  tipoDocBoleta: DocBoleta;
  numeroDoc: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;

  ruc: string;
  razonSocial: string;

  direccion: string;
  correo: string;
  celular: string;

  placa: string;
};

const baseSchema = z.object({
  comprobante: z.enum(["boleta", "factura"]),
  direccion: z.string().trim().min(3, "Ingresa tu dirección").max(200, "Dirección muy larga"),
  correo: z.string().trim().email("Ingresa un correo válido").max(255, "Correo muy largo"),
  celular: z.string().trim().regex(/^\d{9}$/, "El celular debe tener 9 dígitos"),
  placa: z.string().trim().optional(),
});

const boletaSchema = z.object({
  comprobante: z.literal("boleta"),
  tipoDocBoleta: z.enum(["DNI", "CE"]),
  numeroDoc: z
    .string()
    .trim()
    .refine((val, ctx) => {
      const t = ctx.parent?.tipoDocBoleta as DocBoleta | undefined;
      if (t === "DNI") return /^\d{8}$/.test(val);
      if (t === "CE") return /^\d{9,12}$/.test(val);
      return false;
    }, "Documento inválido"),
  nombres: z.string().trim().min(2, "Nombres requeridos").max(80, "Muy largo"),
  apellidoPaterno: z.string().trim().min(2, "Apellido paterno requerido").max(60, "Muy largo"),
  apellidoMaterno: z.string().trim().min(2, "Apellido materno requerido").max(60, "Muy largo"),
});

const facturaSchema = z.object({
  comprobante: z.literal("factura"),
  ruc: z.string().trim().regex(/^\d{11}$/, "El RUC debe tener 11 dígitos"),
  razonSocial: z.string().trim().min(3, "Razón social requerida").max(120, "Muy largo"),
});

export function buildSchema(requiresPlaca: boolean) {
  return z
    .discriminatedUnion("comprobante", [boletaSchema, facturaSchema])
    .and(baseSchema)
    .superRefine((data, ctx) => {
      if (requiresPlaca) {
        const placa = (data as any).placa?.trim() ?? "";
        if (placa.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["placa"],
            message: "Ingresa una placa válida",
          });
        }
      }
    });
}
