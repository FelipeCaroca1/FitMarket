import PropTypes from "prop-types";
import Button from "./Button"; // ✅ Botón reutilizable

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-background text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="mb-6 text-gray-300">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button size="medium" onClick={onCancel} className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
            Cancelar
          </Button>
          <Button size="medium" onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
