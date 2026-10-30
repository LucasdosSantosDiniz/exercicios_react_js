import { useContext } from "react";
import { SomeContext } from "../components/HookUseContext";

const About = () => {
  const { contextValue } = useContext(SomeContext);
  return (
    <div>
      <h2> useContext</h2>
      <p> Valor do Context:{contextValue}</p>
      <hr />
    </div>
  );
};

export default About;
