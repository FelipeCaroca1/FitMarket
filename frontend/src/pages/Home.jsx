import Carousel from "../components/Carousel"; 
import BenefitsSection from "../components/BenefitsSection";
import CallToAction from "../components/CallToAction";


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen bg-background">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mt-10">
        Bienvenido a FitMarket
      </h1>
      <div className="w-full max-w-5xl mt-8">
        <Carousel />
      </div>
      <BenefitsSection />
      <CallToAction />
    </div>
  );
};

export default Home;
