import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center w-full px-8">
        {children}
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
