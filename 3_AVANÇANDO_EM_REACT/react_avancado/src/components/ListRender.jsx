import { useState } from "react";

const ListRender = () => {
  // Nao é o recomendavel! Porem funciona
  const [list] = useState(["Matheus", "Gabriel", "Marina", "Isabela", "Pedro"]);

  // A forma recomendavel é a de chave propria como essa:
  const [users, setUsers] = useState([
    { id: 1, name: "Matheus", age: 23 },
    { id: 2, name: "Gabriel", age: 22 },
    { id: 3, name: "Marina", age: 24 },
    { id: 4, name: "Isabela", age: 21 },
    { id: 5, name: "Pedro", age: 22 },
  ]);

  const deleteRandom = () => {
    const randomNumber = Math.floor(Math.random() * 6);

    setUsers((prevUsers) => {
      return prevUsers.filter((user) => randomNumber !== user.id);
    });
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        {/* Nao é o recomendavel! Porem funciona */}
      </ul>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}, {user.age}
          </li>
        ))}
      </ul>
      <button onClick={deleteRandom}> Deletar Nome</button>
    </div>
  );
};

export default ListRender;
