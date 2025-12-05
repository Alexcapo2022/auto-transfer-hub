import { FileText, Car, Shield, DollarSign, FileCheck, ParkingCircle, CheckCircle } from "lucide-react"; // Ejemplos de íconos

// Beneficios adaptados para el reporte vehicular
const benefits = [
  {
    icon: FileText,
    title: "Boleta Informativa",
    description: "Obtendrás la boleta con todas las características del vehículo.",
  },
  {
    icon: Car,
    title: "Compra de Vehículo",
    description: "Podrás el último monto con el que fue comprado el vehículo.",
  },
  {
    icon: FileText,
    title: "Papeletas por Pagar",
    description: "Papeletas y multas pendientes de pago en Lima, Callao.",
  },
  {
    icon: ParkingCircle,
    title: "Robo de Vehículo",
    description: "Consulta si el vehículo tuvo antecedente de robo.",
  },
  {
    icon: Shield,
    title: "Gravámenes",
    description: "Garantías mobiliarias, embargos, etc.",
  },
  {
    icon: FileCheck,
    title: "Propietarios",
    description: "Propietario actual e historial de propietarios anteriores.",
  },
  {
    icon: DollarSign,
    title: "Impuesto Vehicular",
    description: "Cuotas pendientes de impuesto vehicular de Lima.",
  },
  {
    icon: FileText,
    title: "Soat",
    description: "Vigencia del Seguro obligatorio SOAT.",
  },
  {
    icon: CheckCircle,
    title: "Multas ATU",
    description: "Historial de multas por la ATU para Lima y Callao.",
  },
  {
    icon: ParkingCircle,
    title: "Multas Sutran",
    description: "Multas por la SUTRAN, carga y mercancía.",
  },
  {
    icon: FileText,
    title: "Captura Sat.",
    description: "Captura por deuda tributaria o papeletas.",
  },
  {
    icon: Shield,
    title: "Multas Electorales",
    description: "Multas electorales vigentes asociadas al propietario.",
  },
];

export const ReporteVehicularSection = () => {
  return (
    <section id="reporte-vehicular" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            ¿Qué contiene el reporte?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            El informe cuenta con los siguientes detalles:
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Obtén un informe completo del vehículo que estás comprando o vendiendo para tomar decisiones informadas.
          </p>
        </div>

        {/* Información detallada */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
