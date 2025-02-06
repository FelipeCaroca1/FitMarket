import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <div className="flex items-center justify-center w-screen bg-background">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
          Bienvenido a FitMarket
        </h1>
      </div>
    </Layout>
  );
}

export default App;
