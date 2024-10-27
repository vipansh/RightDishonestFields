import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Calculator from "./pages/Calculator";
import Footer from "./components/Footer";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <main className="flex-grow mb-16 md:mb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
