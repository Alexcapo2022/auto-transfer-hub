import { Button } from "@/components/ui/button";

export const ReporteStep2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl border border-[#00b8a9]/30">
      <h2 className="text-xl font-bold mb-4">Facturación y pago</h2>

      <p className="text-sm text-gray-600 mb-6">Aquí ingresas los datos de facturación.</p>

      {/* luego añadimos: RUC, razón social, y métodos de pago */}

      <div className="flex justify-between mt-6">
        <Button className="bg-[#00b8a9]" onClick={onBack}>
          Volver
        </Button>
        <Button className="bg-[#00b8a9]" onClick={onNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
};
