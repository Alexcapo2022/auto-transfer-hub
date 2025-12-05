import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { FooterSection } from "@/components/FooterSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ReporteVehicularSection } from "@/components/ReporteVehicularSection";
import { PriceSection } from "@/components/PriceSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ReporteVehicularSection />
      <PriceSection/>
      <BenefitsSection />
      <FooterSection />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
