import { Clock, DollarSign, Shield, HeadphonesIcon, FileCheck, Award } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Rapidez Garantizada",
    description: "Completamos tu transferencia en menos de 7 días hábiles, sin demoras ni trámites innecesarios.",
  },
  {
    icon: DollarSign,
    title: "Mejor Precio del Mercado",
    description: "Ofrecemos las tarifas más competitivas, sin costos ocultos ni sorpresas.",
  },
  {
    icon: Shield,
    title: "Proceso 100% Seguro",
    description: "Tus documentos y datos están protegidos durante todo el proceso de transferencia.",
  },
  {
    icon: HeadphonesIcon,
    title: "Atención Personalizada",
    description: "Un asesor dedicado te acompañará en cada paso del trámite.",
  },
  {
    icon: FileCheck,
    title: "Documentación Completa",
    description: "Nos encargamos de toda la documentación necesaria para la transferencia.",
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description: "Miles de clientes satisfechos respaldan nuestro servicio profesional.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Nuestros beneficios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ofrecemos un servicio integral que hace la diferencia en cada transferencia vehicular
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-6 md:p-8 bg-gradient-card rounded-xl border border-border shadow-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
