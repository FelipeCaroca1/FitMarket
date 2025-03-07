import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Guia = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center  text-white"
      style={{ backgroundImage: "url('/img/cta-background.jpg')", backgroundAttachment: "fixed" }}
    >
      <div className="w-[1200px] rounded-lg bg-black bg-opacity-80 p-8 my-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mb-8">
          Lo que necesitas saber sobre suplementos y salud
        </h1>
        <div className="text-lg px-2 mb-6 text-left">
          <p> En FitMarket creemos que el conocimiento es esencial para cuidar tu salud y alcanzar tus objetivos.
            Sabemos que existe mucha información confusa sobre suplementos deportivos y nutrición saludable, y nuestro compromiso es aclarar esas dudas con información clara, precisa y basada en evidencia.
            En esta guía aprenderás sobre la importancia de una alimentación equilibrada, conocerás la verdad detrás de los suplementos más populares,
            y descubrirás cómo integrar hábitos saludables en tu vida diaria para potenciar tu bienestar integral de manera segura y efectiva.
          </p>
          <div className="font-semibold py-5 text-2xl text-left">
            <p> ¡Bienvenido a tu guía definitiva hacia una vida más saludable junto a FitMarket! </p>
          </div>
        </div>
        <div className="py-3">
        
          <section className="mb-4">
            <button
              className="flex text-left text-2xl font-semibold text-gray-400"
              onClick={() => toggleSection('alimentacion')}
            >
              Importancia de la alimentación saludable 🥦
              {openSection === 'alimentacion' ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div
              className={`mt-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'alimentacion' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <p> Una alimentación equilibrada es el pilar fundamental para mantener una buena salud y rendimiento físico.
                Los alimentos que eliges afectan directamente tu energía, recuperación muscular y bienestar general.
                Incorporar una variedad adecuada de proteínas, carbohidratos saludables, grasas esenciales y micronutrientes garantiza que tu cuerpo tenga todo lo necesario para funcionar de manera óptima.
                Además, una buena nutrición puede prevenir enfermedades, mejorar tu estado de ánimo y aumentar tu calidad de vida, demostrando que lo que comes realmente marca la diferencia en cómo te sientes y en los resultados que obtienes de tus esfuerzos físicos.
                Alimentación según objetivos y estilo de vida.
                La alimentación debe adaptarse a cada individuo dependiendo de su edad, estilo de vida y objetivos específicos.
                Por ejemplo, quienes practican deportes de alta intensidad pueden necesitar más carbohidratos y proteínas para mantener la energía y facilitar la recuperación muscular.
                Por otro lado, personas con objetivos de pérdida de peso pueden beneficiarse de dietas equilibradas, priorizando alimentos con alto valor nutricional pero menor densidad calórica.
                Además, la alimentación en etapas como la adolescencia, adultez o tercera edad tiene necesidades particulares, lo cual hace esencial entender cómo adaptar correctamente la dieta a cada momento de la vida, siempre priorizando la salud integral.
                Entender estos aspectos es clave antes de considerar el uso de suplementos deportivos, tema que abordaremos a continuación. </p>
            </div>
          </section>

          <section className="mb-4">
            <button
              className="flex text-left text-2xl font-semibold text-gray-400"
              onClick={() => toggleSection('suplementos')}
            >
              Suplementos deportivos: mitos y verdades 💊
              {openSection === 'suplementos' ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div
              className={`mt-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'suplementos' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <p> Los suplementos deportivos pueden ser una excelente herramienta para complementar una buena alimentación y entrenamiento, pero es clave usarlos de forma informada y responsable.</p>
              <div className="py-2">
                <p>Proteínas: Las proteínas son esenciales para reparar y construir tejido muscular. Su suplementación es beneficiosa especialmente cuando resulta difícil cubrir los requerimientos diarios solo con alimentos.
                  Son útiles para personas activas, atletas o individuos que buscan aumentar su masa muscular o mejorar su recuperación.
                  Sin embargo, su uso debe ajustarse a las necesidades reales según tu nivel de actividad, experiencia en el entrenamiento y objetivos específicos.</p>
              </div>
              <div className="py-2">
                <p>Creatina: La creatina es uno de los suplementos más estudiados y efectivos, conocido por mejorar el rendimiento físico, especialmente en ejercicios de alta intensidad.
                  Aunque es segura para la mayoría de las personas, es importante conocer que su efectividad puede variar según el nivel de entrenamiento, edad y objetivos específicos.
                  No es igualmente efectiva en todos los casos, por lo que conviene informarse bien antes de incorporarla en tu rutina.</p>
              </div>
              <div className="py-2">
                <p>BCAA y Pre-entrenos: Los aminoácidos ramificados (BCAA) ayudan a reducir la fatiga muscular y mejorar la recuperación después del entrenamiento intenso.
                  Por su parte, los pre-entrenos están diseñados para aumentar la energía, concentración y rendimiento durante el ejercicio.
                  Si bien pueden mejorar notablemente el rendimiento deportivo, es esencial usarlos con moderación y elegir aquellos productos que se ajusten realmente a tus necesidades y tolerancia individual.</p>
              </div>
              <div className="py-2">
                <p>Recuerda que ningún suplemento reemplaza una buena alimentación y un estilo de vida activo; son complementos, no soluciones mágicas.
                  Siempre es recomendable consultar fuentes confiables y profesionales de la salud antes de comenzar con cualquier suplementación. </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <button
              className="flex text-left text-2xl font-semibold text-gray-400"
              onClick={() => toggleSection('salud')}
            >
              Salud Integral: Ejercicio, nutrición y bienestar 🏃‍♂️
              {openSection === 'salud' ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div
              className={`mt-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'salud' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <p> La salud integral va más allá del uso de suplementos o productos específicos; implica una combinación equilibrada de ejercicio físico regular, alimentación nutritiva, bienestar emocional y descanso reparador.
                Incorporar estos elementos en tu vida diaria no solo mejora tu estado físico, sino que también fortalece tu salud mental y emocional.
                Practicar ejercicio regularmente contribuye a reducir el riesgo de enfermedades crónicas, mejora el estado de ánimo, aumenta los niveles de energía, y ayuda a manejar el estrés y la ansiedad.
                El ejercicio es beneficioso a cualquier edad: en adolescentes fomenta el desarrollo saludable, en adultos mantiene la vitalidad, y en adultos mayores protege contra el deterioro físico y cognitivo.
                Asimismo, cuidar tu bienestar emocional mediante técnicas como la meditación, el mindfulness o simplemente actividades que disfrutes, incrementa tu calidad de vida y optimiza los resultados de tus esfuerzos físicos.
                En FitMarket, te animamos a adoptar estos hábitos saludables como parte de tu estilo de vida, porque tu bienestar integral es la clave para una vida plena y feliz. </p>
            </div>
          </section>

          <section className="mb-6">
            <button
              className="flex text-left text-2xl font-semibold text-gray-400"
              onClick={() => toggleSection('faq')}
            >
              Preguntas Frecuentes ✨
              {openSection === 'faq' ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div
              className={`mt-4 text-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'faq' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">¿Necesito suplementos deportivos para lograr mis objetivos?</p>
                  <p>No necesariamente. Los suplementos pueden ser útiles para complementar tu alimentación, pero no son indispensables para todos.</p>
                </div>

                <div>
                  <p className="font-semibold">¿Son seguros los suplementos deportivos?</p>
                  <p>Generalmente sí, siempre que sean usados de manera informada y responsable. Es importante elegir productos certificados y seguir indicaciones profesionales.</p>
                </div>

                <div>
                  <p className="font-semibold">¿Quién debería consumir proteínas o creatina?</p>
                  <p>Las proteínas son recomendables para personas activas o atletas que buscan mejorar su recuperación o aumentar masa muscular. La creatina beneficia especialmente a quienes realizan actividades de alta intensidad.</p>
                </div>

                <div>
                  <p className="font-semibold">¿Cómo sé qué alimentación se adapta mejor a mis objetivos?</p>
                  <p>Evalúa tus objetivos específicos (pérdida de peso, rendimiento deportivo) y adapta tu dieta en función de ellos, considerando tu estilo de vida y necesidades individuales.</p>
                </div>

                <div>
                  <p className="font-semibold">¿Qué puedo hacer para comenzar a mejorar mi salud integral desde hoy?</p>
                  <p>Adopta hábitos simples: alimentación equilibrada, ejercicio regular, descanso adecuado y técnicas para manejar el estrés. Pequeños cambios generan grandes beneficios.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400">Para seguir aprendiendo 📖</h2>
            <p className="mt-4 text-gray-200">
              Si quieres profundizar más en estos temas, te recomendamos revisar las siguientes fuentes confiables en español:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.fen.org.es/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Nutrición y salud - Fundación Española de la Nutrición
                </a>
              </li>
              <li>
                <a href="https://medlineplus.gov/spanish/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Investigaciones sobre suplementos deportivos - Medline Plus (Biblioteca Nacional de Medicina de EE.UU. en español)
                </a>
              </li>
              <li>
                <a href="https://www.scielo.cl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Bases científicas sobre fitness y salud - Scielo Chile
                </a>
              </li>
              <li>
                <a href="https://www.minsal.cl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Guía de actividad física y salud - Ministerio de Salud Chile
                </a>
              </li>
              <li>
                <a href="https://www.vitonica.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Artículos sobre fitness y nutrición - Vitónica
                </a>
              </li>
            </ul>
            <p className="mt-4 text-gray-200">
              Recuerda siempre consultar fuentes confiables y profesionales antes de tomar decisiones sobre tu alimentación, suplementos o entrenamientos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guia;
