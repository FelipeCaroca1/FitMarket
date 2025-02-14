import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Redirigir a Login si no hay usuario autenticado
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold">Bienvenido, {user?.name || "Usuario"} 👋</h2>
        <p className="mt-2 text-gray-400">Correo: {user?.email || "No disponible"}</p>
        <Button onClick={logoutUser} className="mt-6">Cerrar Sesión</Button>
      </div>
    </div>
  );
};

export default Profile;
