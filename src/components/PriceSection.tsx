import { useIsMobile } from '../hooks/use-mobile'; // Import the hook

export const PriceSection = () => {
  const isMobile = useIsMobile(); // Call the hook to check if the screen is mobile size

  return (
    <section className="py-20 bg-dark text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#00635B] mb-4">Nuestros Paquetes de Reporte Vehicular</h2>
        <p className="text-lg text-gray-200 max-w-4xl mx-auto">
          Elige el paquete de reporte vehicular que mejor se adapte a tus necesidades. Todos nuestros servicios
          incluyen información detallada y son generados de forma rápida y segura.
        </p>
      </div>

      {/* Use a grid layout or a stack depending on the screen size */}
      <div
        className={`${
          isMobile ? 'flex flex-col gap-8' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
        } max-w-screen-xl mx-auto`}
      >
        {/* Paquete Básico */}
        <div className="bg-[#0F766E] text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-white mb-4">Reporte Básico</h3>
          <p className="text-lg mb-4">Obtén un informe con los datos esenciales del vehículo.</p>
          <div className="text-3xl font-bold text-white text-center">S/ 15</div>
          <button className="mt-6 bg-teal-400 text-white py-3 px-32 rounded-full text-lg hover:bg-teal-500 transition duration-300 mx-auto block">
            Pagar
          </button>
          <ul className="mt-6 space-y-3 text-lg">
            <li>✔ Boleta Informativa</li>
            <li>✔ Papeletas por Pagar</li>
            <li>✔ Impuesto Vehicular</li>
          </ul>
        </div>

        {/* Paquete Estándar */}
        <div className="bg-gradient-to-b from-teal-500 to-teal-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-white mb-4">Reporte Estándar</h3>
          <p className="text-lg mb-4">Incluye el reporte básico más detalles adicionales del vehículo.</p>
          <div className="text-3xl font-bold text-teal-100 text-center">S/ 30</div>
           <button className="mt-6 bg-teal-400 text-white py-3 px-32 rounded-full text-lg hover:bg-teal-500 transition duration-300 mx-auto block">
            Pagar
          </button>
          <ul className="mt-6 space-y-3 text-lg">
            <li>✔ Todo del Reporte Básico</li>
            <li>✔ Gravámenes</li>
            <li>✔ Propietarios</li>
            <li>✔ Multas Sutran</li>
          </ul>
        </div>

        {/* Paquete Premium */}
        <div className="bg-gradient-to-b from-teal-700 to-teal-900 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-white mb-4">Reporte Premium</h3>
          <p className="text-lg mb-4">Obtén el informe más completo con un análisis detallado.</p>
          <div className="text-3xl font-bold text-teal-100 text-center">S/ 50</div>
           <button className="mt-6 bg-teal-400 text-white py-3 px-32 rounded-full text-lg hover:bg-teal-500 transition duration-300 mx-auto block">
            Pagar
          </button>
          <ul className="mt-6 space-y-3 text-lg">
            <li>✔ Todo del Reporte Estándar</li>
            <li>✔ Soat</li>
            <li>✔ Robos de Vehículo</li>
            <li>✔ Multas ATU</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
