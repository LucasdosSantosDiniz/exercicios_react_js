import "./App.css";
import { useState } from "react";
import useFetch from "./Hooks/useFetch";
const url = "http://localhost:3000/products";

function App() {
  /* 1 - resgatando dados
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);*/
  //const [products, setProducts] = useState([]);
  // 4 Custom Hook
  const { data: items, httpConfig, loading, error } = useFetch(url);
  // 2 -  Adicionando Dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };
    /*const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // 3- Carregamento Dinâmico
    const addProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addProduct]);*/

    // Refatorando Post
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    httpConfig(null, "DELETE", id);
  };

  return (
    <div className="App.css">
      <h1> Teste API </h1>
      {/* Loading */}
      {loading && <p> Carregando Dados ...</p>}
      {!loading && (
        <div className="add-product">
          <h2>Resgatando Dados</h2>
          <ul>
            {items &&
              items.map((product) => (
                <li key={product.id}>
                  {product.name} - R$: {product.price}
                  <button onClick={() => handleDelete(product.id)}>
                    {" "}
                    Deletar{" "}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="add-product">
        <h2>Adicionando Dados</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:{" "}
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:{" "}
            <input
              type="text"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - Estado de loading no post */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {error && <p>{error}</p>}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
