import { useState } from "react";

const HooksUseState = () => {
  // 1 - useState
  const userName = "Honda";
  const [name, setName] = useState("Tesla");

  const changeNames = () => {
    userName = "Lamborghini";
    setName("Ferrari");
  };

  // 2 - useState e input
  const [age, setAge] = useState(18);

  const handleSubmit = (e) => {
    e.preventDefault();
    // envio de uma API
    console.log(age);
  };
  return (
    <div>
      {/* 1-useState*/}
      <h2>useState</h2>
      <p>variavel:{userName}</p>
      <p>useState:{name}</p>
      <button onClick={changeNames}> Mudar os nomes !</button>
      {/* 2 - useState e input*/}
      <h3> useState e input</h3>
      <p> Digite sua idade !</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />{" "}
        <input type="submit" value="Enviar" />
      </form>
      <p> Voce tem {age} anos !</p>
      <hr />
    </div>
  );
};

export default HooksUseState;
