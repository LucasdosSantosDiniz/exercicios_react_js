import "./App.css";
import DinamicClassic from "./components/DinamicClassic";
import DinamicInline from "./components/DinamicInline";
import MyComponents from "./components/MyComponents";
import Title from "./components/Title";

function App() {
  return (
    <div>
      {/* CSS Global */}
      <h1> React com CSS</h1>

      {/* CSS de Componentes */}
      <MyComponents />

      {/** CSS Inline */}
      <p
        style={{
          color: "white",
          backgroundColor: "blue",
          padding: "25px",
          fontFamily: "cursive",
          fontSize: "25px",
        }}
      >
        Esse paragrafo é sobre os CSS Inline
      </p>

      {/** CSS Inline Dinamico */}
      <DinamicInline />

      {/** Classes Dinamicas */}
      <DinamicClassic />

      {/** CSS MODULES */}
      <Title />
    </div>
  );
}

export default App;
