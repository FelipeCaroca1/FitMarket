import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button"; // Botón reutilizable

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión con:", formData);
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="bg-black/90 text-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 transition"
              required
            />
          </div>
          <Button type="submit">Iniciar Sesión</Button>
        </form>
        <p className="text-center mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
