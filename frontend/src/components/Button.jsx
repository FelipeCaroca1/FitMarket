import PropTypes from "prop-types";

const Button = ({ children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 px-6 rounded-full border-2 border-red-500 text-red-500 
                 hover:bg-red-500 hover:text-white transition-all duration-300 text-lg font-semibold"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
};

export default Button;
