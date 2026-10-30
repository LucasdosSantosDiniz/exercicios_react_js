import { useEffect, useMemo, useState } from "react";

const HooksUseMemo = () => {
  const [number, setNumber] = useState(0);
  const premiumNumbers = useMemo(() => {
    return ["13", "14", "22", "30", "44", "55"];
  }, []);

  useEffect(() => {
    console.log("Numeros de premios alterados");
  }, [premiumNumbers]);

  return (
    <div>
      <h2>useMemo</h2>
      <p> Tente acertar numeros de 0 a 99</p>
      <input type="text" onChange={(e) => setNumber(e.target.value)} />
      {premiumNumbers.includes(number) ? <p> Acertou o Numero !</p> : ""}
      <hr />
    </div>
  );
};

export default HooksUseMemo;
