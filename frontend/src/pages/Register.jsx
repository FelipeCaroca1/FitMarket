import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";

const Register = () => {
  const { registerUser, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (user) {
      localStorage.removeItem("user");
      setError("Se cerró la sesión anterior. Intenta registrar de nuevo.");
      return;
    }
  
    try {
      await registerUser({
        name: formData.newName, 
        email: formData.newEmail, 
        password: formData.newPassword, 
      });
    } catch (error) {
      setError(error.message || "Error al registrar usuario");
    }
  };
  

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="bg-black/90 text-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm">Nombre</label>
              <input
                type="text"
                name="newName"
                value={formData.newName}
                onChange={handleChange}
                autoComplete="new-name" 
                className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 transition"
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm">Correo Electrónico</label>
              <input
                type="email"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
                autoComplete="new-email" 
                className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 transition"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="new-password" 
              className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 transition"
              required
            />
          </div>
          <Button type="submit">Registrarse</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
