import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// componentes
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <h1>React Router</h1>
      <BrowserRouter>
        <NavBar />
        {/** Formulario de Pesquisa */}
        <SearchForm />
        <Routes>
          {/* Links de rotas com React*/}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Rotas Aninhadas */}
          <Route path="/product/:id/info" element={<Info />} />
          {/* Rotas dinamicas */}
          <Route path="/product/:id" element={<Product />} />
          {/** Pagina de Pesquisa  */}
          <Route path="/search" element={<Search />} />
          {/** Redirecioanmento de pagina antiga pra atual */}
          <Route path="/company" element={<Navigate to="/about" />} />
          {/** Erro 404 pagina nao encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
