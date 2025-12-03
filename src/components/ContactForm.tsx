import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  email: z.string().trim().email("Ingresa un correo electrónico válido").max(255, "El correo es muy largo"),
  phone: z.string().trim().min(9, "Ingresa un número de teléfono válido").max(15, "El número es muy largo"),
});

type FormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    try {
      contactSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      contactSchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });
      
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "" });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.errors.forEach(err => {
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

  if (isSuccess) {
    return (
      <div className="bg-gradient-card rounded-xl p-8 shadow-card border border-border animate-scale-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">¡Gracias por contactarnos!</h3>
          <p className="text-muted-foreground">Un asesor se pondrá en contacto contigo en las próximas horas.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-card rounded-xl p-6 md:p-8 shadow-card border border-border space-y-5">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Solicita tu transferencia</h3>
        <p className="text-sm text-muted-foreground">Completa el formulario y te contactamos</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">Nombre completo</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Juan Pérez"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${errors.name ? 'border-destructive' : ''}`}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${errors.email ? 'border-destructive' : ''}`}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Número de teléfono</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="912 345 678"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          className={`bg-secondary/50 border-border focus:border-primary focus:ring-primary/30 transition-all ${errors.phone ? 'border-destructive' : ''}`}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-glow-primary transition-all duration-300 hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Enviar solicitud
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Al enviar, aceptas nuestra política de privacidad
      </p>
    </form>
  );
};
