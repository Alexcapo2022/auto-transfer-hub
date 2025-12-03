import { ContactForm } from "./ContactForm";
import { Clock, Shield, BadgeCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium animate-fade-in-up">
                Servicio profesional y seguro
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in-up animation-delay-100">
                Transferencia de vehículos al{" "}
                <span className="text-primary">mejor precio</span> del mercado
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                Realizamos tu trámite de transferencia vehicular en menos de{" "}
                <strong className="text-foreground">7 días</strong>, de forma rápida, segura y sin complicaciones.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Menos de 7 días</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span className="text-sm">Garantizado</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto animate-fade-in-up animation-delay-400">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
