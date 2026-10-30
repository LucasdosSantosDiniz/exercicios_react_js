// Refatorando com Hook
import ChangeCounter from "../components/ChangeCounter";
import useCounterContext from "../Hooks/useCounterContext";
import "./Home.css";

const About = () => {
  const { counter } = useCounterContext();
  return (
    <div>
      <h2> About </h2>
      <p> Refatorando contexto com Hooks</p>
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

export default About;
