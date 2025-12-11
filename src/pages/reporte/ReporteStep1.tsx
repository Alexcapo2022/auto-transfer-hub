import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2, FileCheck } from "lucide-react";

interface ReporteStep1Props {
  onNext: () => void;
}

// Esquema de validación del formulario
const reporteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es muy largo"),
  dni: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos"),
  placa: z
    .string()
    .trim()
    .min(5, "La placa debe tener al menos 5 caracteres")
    .max(10, "La placa es muy larga"),
  correo: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .max(255, "El correo es muy largo"),
});

type FormData = z.infer<typeof reporteSchema>;

export const ReporteStep1 = ({ onNext }: ReporteStep1Props) => {
  const { toast } = useToast();

  // Tomamos los valores de los query params al cargar la página
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window === "undefined") {
      return { nombre: "", dni: "", placa: "", correo: "" };
    }

    const params = new URLSearchParams(window.location.search);

    return {
      nombre: params.get("nombre") ?? "",
      dni: params.get("dni") ?? "",
      placa: params.get("placa") ?? "",
      correo: params.get("correo") ?? "",
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    try {
      // Validamos solo ese campo
      reporteSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validamos todo el formulario
      reporteSchema.parse(formData);
      setIsSubmitting(true);

      // TODO: aquí puedes llamar a tu API real para registrar el reporte
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "¡Datos enviados correctamente!",
        description: "Hemos recibido la información de tu reporte vehicular.",
        className: "bg-[#00b8a9] text-white border-[#00b8a9] shadow-lg",
      });

      // (Opcional) limpiar el formulario
      // setFormData({ nombre: "", dni: "", placa: "", correo: "" });

      // Pasar al siguiente paso
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 👇 OJO: ya no usamos <section>, eso lo maneja ReporteFlow.
  return (
    <div className="max-w-3xl w-full space-y-8">
      {/* Encabezado de la página (igual al original) */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium">
          <FileCheck className="w-4 h-4" />
          Confirmación de datos para tu reporte
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Completa tus datos para generar el reporte vehicular
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Hemos prellenado algunos campos con la información que nos enviaste. Por favor,
          revisa y completa los datos antes de continuar.
        </p>
      </div>

      {/* Formulario (mismos estilos que tu versión original) */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-card rounded-xl p-6 md:p-8 shadow-card border border-border space-y-5"
      >
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre" className="font-medium text-[#003c3b]">
            Nombre completo
          </Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${
              errors.nombre ? "border-destructive" : ""
            }`}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* DNI */}
        <div className="space-y-2">
          <Label htmlFor="dni" className="text-sm font-medium text-foreground">
            DNI
          </Label>
          <Input
            id="dni"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 72924493"
            value={formData.dni}
            onChange={(e) => handleChange("dni", e.target.value)}
            onBlur={() => handleBlur("dni")}
            className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${
              errors.dni ? "border-destructive" : ""
            }`}
          />
          {errors.dni && (
            <p className="text-xs text-destructive mt-1">{errors.dni}</p>
          )}
        </div>

        {/* Placa */}
        <div className="space-y-2">
          <Label htmlFor="placa" className="text-sm font-medium text-foreground">
            Placa del vehículo
          </Label>
          <Input
            id="placa"
            type="text"
            placeholder="Ej: BPE-123"
            value={formData.placa}
            onChange={(e) => handleChange("placa", e.target.value.toUpperCase())}
            onBlur={() => handleBlur("placa")}
            className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all uppercase tracking-wide ${
              errors.placa ? "border-destructive" : ""
            }`}
          />
          {errors.placa && (
            <p className="text-xs text-destructive mt-1">{errors.placa}</p>
          )}
        </div>

        {/* Correo */}
        <div className="space-y-2">
          <Label htmlFor="correo" className="text-sm font-medium text-foreground">
            Correo electrónico
          </Label>
          <Input
            id="correo"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={formData.correo}
            onChange={(e) => handleChange("correo", e.target.value)}
            onBlur={() => handleBlur("correo")}
            className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${
              errors.correo ? "border-destructive" : ""
            }`}
          />
          {errors.correo && (
            <p className="text-xs text-destructive mt-1">{errors.correo}</p>
          )}
        </div>

        {/* Botón enviar */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-glow-primary transition-all duration-300 hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Enviando datos...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Confirmar y continuar
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Al enviar, aceptas que nos comuniquemos contigo para compartir el reporte vehicular.
        </p>
      </form>
    </div>
  );
};
