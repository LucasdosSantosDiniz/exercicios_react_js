import "./App.css";
import MyForm from "./components/MyForm";

function App() {
  return (
    <div>
      <h2> Formulários em React</h2>
      <MyForm
        user={{
          name: "Josias",
          email: "josiasnaquelenaipao@gmail.com",
          textArea: "Eu sou o Presidente dessa porra, bando de desgraça",
          selectRole: "admin",
        }}
      />
    </div>
  );
}

export default App;
