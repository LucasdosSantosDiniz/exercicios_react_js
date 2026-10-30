import useTitleColorContext from "../Hooks/useTitleColorContext";
// Alterando context complexo
const Products = () => {
  const { color, dispatch } = useTitleColorContext();
  console.log(color);

  const setTitleColor = (color) => {
    dispatch({ type: color });
  };
  return (
    <div>
      <h2 style={{ color: color }}> Produtos</h2>
      <div>
        <button onClick={() => setTitleColor("YELLOW")}> Amarelo</button>
        <button onClick={() => setTitleColor("GREEN")}> Verde </button>
      </div>
    </div>
  );
};

export default Products;
