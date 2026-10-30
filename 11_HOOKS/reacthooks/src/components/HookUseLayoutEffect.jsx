import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";

const HookUseLayoutEffect = () => {
  const [name, setName] = useState("Algum Nome !");

  useEffect(() => {
    console.log(100);
    setName("Mudou de novo");
  }, []);

  useLayoutEffect(() => {
    console.log(50);
    setName("Novo nome");
  }, []);

  console.log(name);

  return (
    <div>
      <h2>useLayoutEffect</h2>
      <p>{name}</p>
    </div>
  );
};

export default HookUseLayoutEffect;
