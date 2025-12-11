import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "14155238886"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, estoy interesado en el servicio de transferencia vehicular.");

export const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-5 py-4 rounded-full shadow-glow-accent transition-all duration-300 hover:scale-105 group animate-float"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline">¡Hablemos por WhatsApp!</span>
    </button>
  );
};
