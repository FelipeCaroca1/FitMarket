import { FaDumbbell, FaShippingFast, FaBook, FaBolt } from "react-icons/fa";

const benefits = [
  { icon: <FaDumbbell className="text-4xl text-red-500" />, title: "Variedad de productos", description: "Encuentra suplementos, equipamiento y más para tu estilo de vida fitness." },
  { icon: <FaShippingFast className="text-4xl text-red-500" />, title: "Envíos rápidos y seguros", description: "Recibe tus pedidos en tiempo récord con nuestro servicio de entrega confiable." },
  { icon: <FaBook className="text-4xl text-red-500" />, title: "Asesoramiento experto", description: "Aprende sobre suplementación y equipamiento con nuestra guía especializada." },
  { icon: <FaBolt className="text-4xl text-red-500" />, title: "Compra fácil y rápida", description: "Un proceso de compra intuitivo y seguro para que disfrutes sin complicaciones." },
];

const BenefitsSection = () => {
  return (
    <section className="w-full py-16 bg-background text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mt-10">Beneficios de FitMarket</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-black rounded-lg shadow-lg">
            {benefit.icon}
            <div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
