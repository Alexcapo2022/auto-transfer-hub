import { Button } from "@/components/ui/button";

export const ReporteStep3 = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl border border-[#00b8a9]/30 text-center">
      <h2 className="text-2xl font-bold mb-4">¡Pago confirmado!</h2>

      <p className="text-gray-600 mb-8">
        Aquí puedes descargar tu reporte vehicular.
      </p>

      <Button className="bg-[#00b8a9] hover:bg-[#009c90] mb-3">
        Descargar PDF
      </Button>

      <div>
        <Button className="bg-[#00b8a9]" onClick={onBack}>
          Volver
        </Button>
      </div>
    </div>
  );
};
