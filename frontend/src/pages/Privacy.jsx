import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal.jsx";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDeleteAccount = async () => {
    await deleteAccount();
    setIsDeleteModalOpen(false);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mb-8 py-2">
        Políticas de Privacidad
      </h1>

      <p className="mb-4 text-gray-300">
        En FitMarket, tu privacidad es muy importante para nosotros. A continuación, te explicamos cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">1. Información recopilada</h2>
      <p className="text-gray-400">
        Recopilamos datos personales como nombre, correo electrónico, dirección, entre otros, cuando te registras o realizas una compra.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">2. Uso de la información</h2>
      <p className="text-gray-400">
        Utilizamos tus datos para procesar pedidos, mejorar tu experiencia en la app y enviarte notificaciones relevantes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">3. Seguridad</h2>
      <p className="text-gray-400">
        Implementamos medidas de seguridad para proteger tus datos personales frente a accesos no autorizados.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">4. Derechos del usuario</h2>
      <p className="text-gray-400">
        Puedes solicitar la modificación o eliminación de tus datos en cualquier momento desde la configuración de tu cuenta.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">5. Cambios en la política</h2>
      <p className="text-gray-400">
        FitMarket se reserva el derecho de actualizar esta política. Te notificaremos si se realizan cambios importantes.
      </p>

      <div className="mt-10">
        <p className="text-sm text-gray-500">
          ¿Deseas eliminar tu cuenta?{" "}
          <span
            onClick={() => setIsDeleteModalOpen(true)}
            className="cursor-pointer text-gray-400 hover:underline hover:text-gray-300"
          >
            Haz clic aquí para hacerlo.
          </span>
        </p>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar Cuenta"
        message="¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible."
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Privacy;
