import { useState } from "react";
import "./App.css";
import ChangeMessage from "./components/ChangeMessage";
import ConditionalRender from "./components/ConditionalRender";
import Container from "./components/Container";
import ExecuteFunction from "./components/ExecuteFunction";
import Images from "./components/Images";
import ListRender from "./components/ListRender";
import LoopArrayObjects from "./components/LoopArrayObjects";
import ManageData from "./components/ManageData";
import Message from "./components/Message";
import NameDetails from "./components/NameDetails";
import LoopUserDetails from "./components/LoopUserDetails";

function App() {
  function showMensage() {
    console.log("Função executada com sucesso !!!");
  }

  const [message, setMessage] = useState("");

  const handleMessage = (msg) => {
    setMessage(msg);
  };
  return (
    <div>
      <h1> AVANÇANDO EM REACT</h1>
      <div>
        <Images />
      </div>{" "}
      <br />
      <div>
        <ManageData />
      </div>
      <br />
      <div>
        <ListRender />
        <ConditionalRender />
      </div>{" "}
      <br />
      <div>
        {/* Props */}
        <NameDetails
          name={"Matheus"}
          age={23}
          ethny={"Europeu"}
          city={"Belo Horzonte"}
          brazilianPerson={true}
        />
        <NameDetails
          name={"Gabriel"}
          age={22}
          ethny={"Asiatico"}
          city={"São Paulo"}
          brazilianPerson={true}
        />
        <NameDetails
          name={"Marina"}
          age={24}
          ethny={"Africano"}
          city={"Luanda"}
          brazilianPerson={false}
        />
        <NameDetails
          name={"Isabela"}
          age={21}
          ethny={"Indigena"}
          city={"Manaus"}
          brazilianPerson={true}
        />
        <NameDetails
          name={"Pedro"}
          age={22}
          ethny={"Europeu"}
          city={"Lisboa"}
          brazilianPerson={false}
        />

        {/* Loop em array de objetos */}
        <LoopArrayObjects />
        <br />
        <div>
          {/* Props Children exemplo */}
          <Container MyValue={"testing"}>
            <p> Exemplo de children com sucesso !!</p>
          </Container>
        </div>
        <div>
          {/* Executando função no props */}
          <ExecuteFunction MyFunction={showMensage} />
        </div>
        <br />
        <div>
          {/* State Lift */}
          <Message msg={message} />
          <ChangeMessage handleMessage={handleMessage} />
        </div>
        <br />
        <div>
          {/* Desafio 4 */}
          <h2> DESAFIO 4</h2>
          <LoopUserDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
