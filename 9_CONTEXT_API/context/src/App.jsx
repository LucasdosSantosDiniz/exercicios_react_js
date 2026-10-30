import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// paginas
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
//componentes
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App.css">
      <h1> Context API </h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
