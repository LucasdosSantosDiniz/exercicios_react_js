import { useParams } from "react-router-dom";

const Info = () => {
  const { id } = useParams();

  return (
    <div>
      <h2> Mais Informações sobre o produto</h2>
      <h2>{id}</h2>
    </div>
  );
};

export default Info;
