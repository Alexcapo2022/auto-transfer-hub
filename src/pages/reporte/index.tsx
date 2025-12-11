import { useState } from "react";
import { ReporteStep1 } from "../reporte/ReporteStep1";
import { ReporteStep2 } from "../reporte/ReporteStep2";
import { ReporteStep3 } from "../reporte/ReporteStep3";
import { ProgressBar } from "../reporte/ProgressBar";
import { useIsMobile } from "@/hooks/use-mobile"; // 👈 hook responsive

export default function ReporteFlow() {
  const [step, setStep] = useState(1);
  const isMobile = useIsMobile(); // 👈 detecta si es móvil

  return (
    <section className="min-h-screen bg-white text-[#003c3b] px-4 py-8 flex flex-col items-center">
      {/* Contenedor central que cambia según si es mobile o desktop */}
      <div className={isMobile ? "w-full space-y-6" : "max-w-3xl w-full space-y-8"}>
        {/* Barra de progreso reutilizable */}
        <ProgressBar step={step} isMobile={isMobile} />

        {/* Render de componente según step */}
        {step === 1 && <ReporteStep1 onNext={() => setStep(2)} />}
        {step === 2 && <ReporteStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <ReporteStep3 onBack={() => setStep(2)} />}
      </div>
    </section>
  );
}
