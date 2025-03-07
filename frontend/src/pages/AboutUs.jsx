

const AboutUs = () => {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex flex-col items-center text-white"
            style={{ backgroundImage: "url('/img/cta-background.jpg')" }}>
            <div className="w-full rounded-lg bg-black bg-opacity-70 p-8">
                <h1
                    className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300"
                    style={{ backgroundSize: "19.9%" }}
                >
                    Sobre FitMarket
                </h1>


                <section className="mt-6 text-lg text-init max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-red-500">Nuestra Misión</h2>
                    <p className="mt-2">En FitMarket, nos dedicamos a ofrecer productos de alta calidad para ayudar a las personas a alcanzar sus objetivos de salud y bienestar de manera efectiva y segura.</p>
                </section>

                <section className="mt-6 text-lg text-init max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-red-500">Nuestros Productos</h2>
                    <p className="mt-2">Ofrecemos una amplia variedad de suplementos, equipamiento, accesorios y productos de salud. Nos aseguramos de que cada producto en nuestro catálogo cumpla con altos estándares de calidad.</p>
                </section>

                <section className="mt-6 text-lg text-init max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-red-500">Compromiso con la Salud</h2>
                    <p className="mt-2">Nuestro objetivo es proporcionar opciones seguras y efectivas para mejorar el bienestar de nuestros clientes. Trabajamos con marcas reconocidas y productos certificados.</p>
                </section>

                <section className="mt-6 text-lg text-init max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-red-500">Nuestra Comunidad</h2>
                    <p className="mt-2">En FitMarket, no solo vendemos productos, sino que también buscamos construir una comunidad de personas motivadas por un estilo de vida saludable y activo.</p>
                </section>

                <div className="mt-8 flex justify-center">
                    <a href="/guide" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                        Ver Guía de Salud y Suplementos
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
