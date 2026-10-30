import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";

const HookCustom = () => {
  const [number, setNumber] = useState(0);
  const previousNumber = usePrevious(number);

  return (
    <div>
      <h2>Custom Hooks</h2>
      <p> Numero atual: {number}</p>
      <p> Numero anterior: {previousNumber}</p>
      <button onClick={() => setNumber(Math.floor(Math.random() * 1000))}>
        Alterar
      </button>
      <hr />
    </div>
  );
};

export default HookCustom;
