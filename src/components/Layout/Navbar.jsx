const Navbar = () => {
    return (
      <nav className="bg-dark text-white p-4 flex justify-between items-center border-b-2 border-neonBlue shadow-md">
        <h1 className="text-2xl font-bold text-neonBlue">FitMarket</h1>
        <div className="space-x-4">
          <a href="#" className="hover:text-neonPurple transition-all duration-300">
            Inicio
          </a>
          <a href="#" className="hover:text-neonPurple transition-all duration-300">
            Tienda
          </a>
          <a href="#" className="hover:text-neonPurple transition-all duration-300">
            Perfil
          </a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  