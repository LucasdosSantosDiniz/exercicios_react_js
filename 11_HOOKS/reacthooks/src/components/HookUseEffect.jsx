import { useEffect, useState } from "react";

const HookUseEffect = () => {
  // 1- useEffect sem dependencias
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(" Função executada !");
  });

  const changeSomenthing = () => {
    setNumber(number + 1);
  };

  // 2- useEffect com array de dependencia vazio
  useEffect(() => {
    console.log(" Função executada uma unica vez !");
  }, []);

  // 3 - useEffect com item no array dependencia
  const [anotherNumber, setAnotherNumber] = useState(1);

  useEffect(() => {
    if (anotherNumber > 3) {
      console.log(
        " Sou executado quando clico no botão mudar e sou maior que 3 ",
      );
    }
  }, [anotherNumber]);

  // 4 Clenup useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(" Hello World !");
    }, 3000);
    return () => clearTimeout(timer);
  }, [anotherNumber]);

  return (
    <div>
      <h2>useEffect</h2>
      <p>numero:{number}</p>
      <button onClick={changeSomenthing}> Executar</button>
      <p>numero:{anotherNumber}</p>
      <button onClick={() => setAnotherNumber(anotherNumber * 2)}>
        {" "}
        Mudar Numero
      </button>
      <hr />
    </div>
  );
};

export default HookUseEffect;
