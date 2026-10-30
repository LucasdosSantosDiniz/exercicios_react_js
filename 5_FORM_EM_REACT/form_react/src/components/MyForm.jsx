import { useState } from "react";
import "./MyForm.css";

const MyForm = ({ user }) => {
  // 3 - Gerenciando Dados
  const [name, setName] = useState(user ? user.name : ""); // 6 - A variavel user represenata o Controle de Inputs
  const [email, setEmail] = useState(user ? user.email : "");
  const [textArea, setTextArea] = useState(user ? user.textArea : "");
  const [selectRole, setSelectRole] = useState(user ? user.selectRole : "");

  const handleName = (e) => {
    setName(e.target.value);
  };

  // 5 - Envio de Formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando o Formulario");
    console.log(name, email, textArea, selectRole);

    // 7 - Limpar Form
    setName("");
    setEmail("");
    setTextArea("");
    setSelectRole("");
  };

  return (
    <div>
      {/** 1 - Criacão de formulários */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Nome: </label>
          <input
            type="text"
            name="name"
            placeholder="Seu Nome"
            onChange={handleName}
            value={name}
          />
        </div>
        {/** 2 - Label envolvendo o Input */}
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Seu Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <textarea
            name="textArea"
            placeholder="Descrição do usuario"
            onChange={(e) => setTextArea(e.target.value)}
            value={textArea}
          ></textarea>
        </label>
        <label>
          <select
            name="selectRole"
            onChange={(e) => setSelectRole(e.target.value)}
            value={selectRole}
          >
            <option value="users"> Usuario</option>
            <option value="editors"> Editor</option>
            <option value="admin"> Administrador</option>
          </select>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default MyForm;
