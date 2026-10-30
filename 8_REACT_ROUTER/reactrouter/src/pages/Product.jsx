import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Product = () => {
  const { id } = useParams();
  console.log(id);
  const url = `http://localhost:3000/products/${id}`;
  const { data: product, loading, error } = useFetch(url);
  return (
    <div>
      <p>Produto de id :{id}</p>
      {error && <p>Erro ao carregar os dados</p>}
      {loading && <p> Carregando ....</p>}
      {product && (
        <div>
          {" "}
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          {/* Rotas Aninhadas */}
          <Link to={`/product/${product.id}/info`}>Mais Infomrações</Link>
        </div>
      )}
    </div>
  );
};

export default Product;
