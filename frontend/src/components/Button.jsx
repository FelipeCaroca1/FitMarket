import PropTypes from "prop-types";

const Button = ({ children, onClick, type = "button", size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-6 text-lg",
    large: "py-3 px-8 text-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full border-2 border-red-500 text-white 
                  hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold 
                  ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  onClick: () => { },
};

export default Button;

