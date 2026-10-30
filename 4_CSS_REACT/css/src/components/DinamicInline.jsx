import { useState } from "react";

const DinamicInline = () => {
  const [name] = useState("Brazil");
  return (
    <div>
      <h2> CSS Inline Dinamico</h2>
      <p
        style={
          name === "Brasil"
            ? { color: "yellow", backgroundColor: "green" }
            : { color: "white", backgroundColor: "blue" }
        }
      >
        ORDEM E PROGRESSO
      </p>
    </div>
  );
};

export default DinamicInline;
