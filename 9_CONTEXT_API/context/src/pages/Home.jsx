import { useContext } from "react";
import "./Home.css";
import { CounterContext } from "../Context/CounterContext";
import ChangeCounter from "../components/ChangeCounter";

const Home = () => {
  const { counter } = useContext(CounterContext);

  return (
    <div>
      <h2>Home</h2>
      <p> Refatorando contexto sem Hooks</p>
      <div className="products">
        <h3> O Valor do Contador é: </h3>
        <p>{counter}</p>
        <br />
        {/** Alterando Valor de contexto */}
        <ChangeCounter />
      </div>
    </div>
  );
};

export default Home;
