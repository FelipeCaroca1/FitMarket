import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button"; // Importamos el nuevo componente

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
    };

    return (
        <div className="w-full flex justify-center items-center px-4">
            <div className="bg-black/90 text-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-sm">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Button type="submit">Registrarse</Button>
                    </div>
                </form>
                <p className="text-center mt-4 text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-red-400 hover:text-red-500">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
