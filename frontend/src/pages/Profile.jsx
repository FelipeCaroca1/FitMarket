import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Esperar a que el contexto cargue los datos en lugar de revisar localStorage
    if (user === null) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    }
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center text-white">Cargando perfil...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold">
          Bienvenido, {user?.name || "Usuario"} 👋
        </h2>
        <p className="mt-2 text-gray-400">Correo: {user?.email || "No disponible"}</p>
        <Button onClick={logoutUser} className="mt-6">Cerrar Sesión</Button>
      </div>
    </div>
  );
};

export default Profile;
