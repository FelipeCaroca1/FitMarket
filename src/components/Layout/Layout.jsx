import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      {/* 🔥 FIX: Esto garantiza que el contenido ocupe el espacio suficiente */}
      <main className="flex-grow flex flex-col justify-center items-center w-full px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
