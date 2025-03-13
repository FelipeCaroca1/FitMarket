const Support = () => {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold border-b border-muted pb-2 mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">
          ¿Necesitas ayuda?
        </h1>
  
        <p className="mb-4 text-gray-300">
          Si tienes dudas, problemas con tu cuenta o necesitas asistencia, aquí te dejamos algunas formas de contactarnos:
        </p>
  
        <ul className="space-y-4 text-gray-400">
          <li>
            📧 <span className="font-medium text-white">Correo:</span> soporte@fitmarket.com
          </li>
          <li>
            💬 <span className="font-medium text-white">Chat en línea:</span> Disponible de lunes a viernes, 09:00 a 18:00 hrs.
          </li>
          <li>
            📱 <span className="font-medium text-white">WhatsApp:</span> +56 9 1234 5678
          </li>
          <li>
            📄 <span className="font-medium text-white">Centro de ayuda:</span> Próximamente incorporaremos una sección de preguntas frecuentes.
          </li>
        </ul>
  
        <p className="mt-6 text-gray-500 text-sm">
          Nuestro equipo estará feliz de ayudarte lo antes posible 💪
        </p>
      </div>
    );
  };
  
  export default Support;
  