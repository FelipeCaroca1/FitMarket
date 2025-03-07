import { useState, useEffect } from "react";

const images = [
  "/img/carrusel1.jpg",
  "/img/carrusel2.jpg",
  "/img/carrusel3.jpg",
  "/img/carrusel4.jpg",
  "/img/carrusel5.jpg"
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex justify-center py-4"> 
      <div className="relative w-full max-w-4xl max-h-[420px] mx-auto overflow-hidden rounded-lg shadow-lg">
        <div className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index}`} className="w-full h-[600px] object-cover" />
          ))}
        </div>
        <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
          ❮
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
          ❯
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

  export default Carousel;