import React, { useMemo, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2, FileCheck, Receipt, Building2, Car } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReporteStep1Props {
  onNext: () => void;
}

type Comprobante = "boleta" | "factura";
type DocBoleta = "DNI" | "CE";

type FormState = {
  cod_serv: string; // solo para mostrar/leer, no lo mandes si no quieres
  comprobante: Comprobante;

  // boleta
  tipoDocBoleta: DocBoleta;
  numeroDoc: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;

  // factura
  ruc: string;
  razonSocial: string;

  // comunes
  direccion: string;
  correo: string;
  celular: string;

  // condicional
  placa: string;
};

// Helpers simples
const onlyDigits = (v: string) => v.replace(/\D+/g, "");
const upper = (v: string) => v.toUpperCase();

const baseSchema = z.object({
  comprobante: z.enum(["boleta", "factura"]),
  direccion: z.string().trim().min(3, "Ingresa tu dirección").max(200, "Dirección muy larga"),
  correo: z.string().trim().email("Ingresa un correo válido").max(255, "Correo muy largo"),
  celular: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "El celular debe tener 9 dígitos"),
  placa: z.string().trim().optional(),
});

// Sub-esquemas
const boletaSchema = z.object({
  comprobante: z.literal("boleta"),
  tipoDocBoleta: z.enum(["DNI", "CE"]),
  numeroDoc: z
    .string()
    .trim()
    .refine((val, ctx) => {
      // DNI 8, CE 9..12 (ajustable)
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

// Schema final (boleta/factura) + comunes + regla de placa
function buildSchema(requiresPlaca: boolean) {
  const schema = z
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

  return schema;
}

export const ReporteStep1 = ({ onNext }: ReporteStep1Props) => {
  const { toast } = useToast();

  const params = useMemo(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const cod_serv = params.get("cod_serv") ?? "7";
  const requiresPlaca = cod_serv === "8";

  const schema = useMemo(() => buildSchema(requiresPlaca), [requiresPlaca]);

  const [form, setForm] = useState<FormState>(() => {
    // Prefill básico desde query params si deseas (opcional)
    return {
      cod_serv,
      comprobante: (params.get("comprobante") as Comprobante) ?? "boleta",

      tipoDocBoleta: (params.get("tipoDoc") as DocBoleta) ?? "DNI",
      numeroDoc: params.get("doc") ?? "",
      nombres: params.get("nombres") ?? "",
      apellidoPaterno: params.get("ap_pat") ?? "",
      apellidoMaterno: params.get("ap_mat") ?? "",

      ruc: params.get("ruc") ?? "",
      razonSocial: params.get("razonSocial") ?? "",

      direccion: params.get("direccion") ?? "",
      correo: params.get("correo") ?? "",
      celular: params.get("celular") ?? "",

      placa: params.get("placa") ?? "",
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateAll = () => {
    try {
      schema.parse(form);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const mapped: Partial<Record<keyof FormState, string>> = {};
        for (const issue of e.issues) {
          const k = issue.path?.[0] as keyof FormState | undefined;
          if (k && !mapped[k]) mapped[k] = issue.message;
        }
        setErrors(mapped);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      setIsSubmitting(true);

      // ✅ Aquí ya tienes la data lista para enviarla a tu backend
      // Puedes armar un payload según comprobante:
      // - boleta: { tipoDocBoleta, numeroDoc, nombres, apellidos... }
      // - factura: { ruc, razonSocial, ... }
      // - comunes: direccion, correo, celular
      // - placa si aplica
      await new Promise((r) => setTimeout(r, 900));

      toast({
        title: "¡Listo! Datos confirmados",
        description: "Continuemos con el siguiente paso.",
        className: "bg-[#00b8a9] text-white border-[#00b8a9] shadow-lg",
      });

      onNext();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBoleta = form.comprobante === "boleta";
  const isFactura = form.comprobante === "factura";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium">
          <FileCheck className="w-4 h-4" />
          Confirmación de datos para tu reporte
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Datos para emitir tu {form.comprobante === "boleta" ? "boleta" : "factura"} y generar el reporte
        </h1>

        <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
          Completa la información. Algunos campos cambian según el tipo de comprobante.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
        >
          {/* Comprobante */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Tipo de comprobante</Label>

            <RadioGroup
              value={form.comprobante}
              onValueChange={(v) => {
                const comprobante = v as Comprobante;
                setField("comprobante", comprobante);

                // limpia errores específicos al cambiar
                setErrors((prev) => ({
                  ...prev,
                  numeroDoc: undefined,
                  nombres: undefined,
                  apellidoPaterno: undefined,
                  apellidoMaterno: undefined,
                  ruc: undefined,
                  razonSocial: undefined,
                }));
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <label className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 cursor-pointer hover:bg-secondary/50 transition">
                <RadioGroupItem value="boleta" id="boleta" />
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4" />
                  <div className="leading-tight">
                    <p className="font-semibold">Boleta</p>
                    <p className="text-xs text-muted-foreground">DNI / CE</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 cursor-pointer hover:bg-secondary/50 transition">
                <RadioGroupItem value="factura" id="factura" />
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <div className="leading-tight">
                    <p className="font-semibold">Factura</p>
                    <p className="text-xs text-muted-foreground">RUC + Razón social</p>
                  </div>
                </div>
              </label>
            </RadioGroup>
          </div>

          <div className="my-6 h-px bg-border" />

          {/* BOLETA */}
          {isBoleta && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tipo doc */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo de documento</Label>
                  <Select
                    value={form.tipoDocBoleta}
                    onValueChange={(v) => {
                      setField("tipoDocBoleta", v as DocBoleta);
                      // al cambiar tipo doc, limpia numero
                      setField("numeroDoc", "");
                    }}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipoDocBoleta && (
                    <p className="text-xs text-destructive">{errors.tipoDocBoleta}</p>
                  )}
                </div>

                {/* Nro doc */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">
                    Número de documento ({form.tipoDocBoleta})
                  </Label>
                  <Input
                    value={form.numeroDoc}
                    onChange={(e) => setField("numeroDoc", onlyDigits(e.target.value))}
                    placeholder={form.tipoDocBoleta === "DNI" ? "Ej: 72924493" : "Ej: 001234567"}
                    inputMode="numeric"
                    className={`bg-secondary/50 ${errors.numeroDoc ? "border-destructive" : ""}`}
                  />
                  {errors.numeroDoc && (
                    <p className="text-xs text-destructive">{errors.numeroDoc}</p>
                  )}
                </div>
              </div>

              {/* Nombres y apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label className="text-sm font-medium">Nombres</Label>
                  <Input
                    value={form.nombres}
                    onChange={(e) => setField("nombres", e.target.value)}
                    placeholder="Ej: Patrick"
                    className={`bg-secondary/50 ${errors.nombres ? "border-destructive" : ""}`}
                  />
                  {errors.nombres && <p className="text-xs text-destructive">{errors.nombres}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Apellido paterno</Label>
                  <Input
                    value={form.apellidoPaterno}
                    onChange={(e) => setField("apellidoPaterno", e.target.value)}
                    placeholder="Ej: Miñán"
                    className={`bg-secondary/50 ${
                      errors.apellidoPaterno ? "border-destructive" : ""
                    }`}
                  />
                  {errors.apellidoPaterno && (
                    <p className="text-xs text-destructive">{errors.apellidoPaterno}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Apellido materno</Label>
                  <Input
                    value={form.apellidoMaterno}
                    onChange={(e) => setField("apellidoMaterno", e.target.value)}
                    placeholder="Ej: Pérez"
                    className={`bg-secondary/50 ${
                      errors.apellidoMaterno ? "border-destructive" : ""
                    }`}
                  />
                  {errors.apellidoMaterno && (
                    <p className="text-xs text-destructive">{errors.apellidoMaterno}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* FACTURA */}
          {isFactura && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tipo doc fijo */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo de documento</Label>
                  <Input value="RUC" disabled className="bg-secondary/50" />
                </div>

                {/* RUC */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">RUC</Label>
                  <Input
                    value={form.ruc}
                    onChange={(e) => setField("ruc", onlyDigits(e.target.value))}
                    placeholder="Ej: 20123456789"
                    inputMode="numeric"
                    className={`bg-secondary/50 ${errors.ruc ? "border-destructive" : ""}`}
                  />
                  {errors.ruc && <p className="text-xs text-destructive">{errors.ruc}</p>}
                </div>
              </div>

              {/* Razón social */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Razón social</Label>
                <Input
                  value={form.razonSocial}
                  onChange={(e) => setField("razonSocial", e.target.value)}
                  placeholder="Ej: Auto Transfer Hub SAC"
                  className={`bg-secondary/50 ${errors.razonSocial ? "border-destructive" : ""}`}
                />
                {errors.razonSocial && (
                  <p className="text-xs text-destructive">{errors.razonSocial}</p>
                )}
              </div>
            </div>
          )}

          <div className="my-6 h-px bg-border" />

          {/* COMUNES */}
          <div className="space-y-5">
            {/* Placa solo si cod_serv=8 */}
            {requiresPlaca && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Placa del vehículo
                </Label>
                <Input
                  value={form.placa}
                  onChange={(e) => setField("placa", upper(e.target.value))}
                  placeholder="Ej: BPE-123"
                  className={`bg-secondary/50 uppercase tracking-wide ${
                    errors.placa ? "border-destructive" : ""
                  }`}
                />
                {errors.placa && <p className="text-xs text-destructive">{errors.placa}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Dirección</Label>
              <Input
                value={form.direccion}
                onChange={(e) => setField("direccion", e.target.value)}
                placeholder="Ej: Av. Arequipa 123, Lima"
                className={`bg-secondary/50 ${errors.direccion ? "border-destructive" : ""}`}
              />
              {errors.direccion && (
                <p className="text-xs text-destructive">{errors.direccion}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Correo</Label>
                <Input
                  value={form.correo}
                  onChange={(e) => setField("correo", e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  type="email"
                  className={`bg-secondary/50 ${errors.correo ? "border-destructive" : ""}`}
                />
                {errors.correo && <p className="text-xs text-destructive">{errors.correo}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Celular</Label>
                <Input
                  value={form.celular}
                  onChange={(e) => setField("celular", onlyDigits(e.target.value))}
                  placeholder="Ej: 987654321"
                  inputMode="numeric"
                  className={`bg-secondary/50 ${errors.celular ? "border-destructive" : ""}`}
                />
                {errors.celular && <p className="text-xs text-destructive">{errors.celular}</p>}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-glow-primary transition-all duration-300 hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Confirmar y continuar
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Al enviar, aceptas que nos comuniquemos contigo para compartir el reporte.
            </p>
          </div>
        </form>

        {/* Panel lateral */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-sm sticky top-6">
            <p className="text-sm font-semibold text-foreground">Resumen</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servicio</span>
                <span className="font-semibold">cod_serv = {cod_serv}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Comprobante</span>
                <span className="font-semibold">
                  {form.comprobante === "boleta" ? "Boleta" : "Factura"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Placa</span>
                <span className="font-semibold">
                  {requiresPlaca ? "Requerida" : "No requerida"}
                </span>
              </div>
            </div>

            <div className="mt-5 text-xs text-muted-foreground leading-relaxed">
              Si elegiste <b>Factura</b> asegúrate de ingresar RUC y Razón Social correctamente.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
