import { useState } from "react";
import "./DinamicClassic.css";
const DinamicClassic = () => {
  const [redTitlle, setColor] = useState(true);
  return (
    <div>
      <h2> Classes Dinamicas</h2>
      <h3 className={redTitlle ? "redTitlle" : "titlle"}>
        Esse titulo é classe dinamica
      </h3>
      <button onClick={() => setColor(!redTitlle)}> Clique Aqui</button>
    </div>
  );
};

export default DinamicClassic;
