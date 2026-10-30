import HooksUseState from "../components/HooksUseState";
import HookUseEffect from "../components/HookUseEffect";
import HookUseReducer from "../components/HookUseReducer";
import HookUseRef from "../components/HookUseRef";
import { useContext } from "react";
import { SomeContext } from "../components/HookUseContext";
import HookUseCallback from "../components/HookUseCallback";
import HooksUseMemo from "../components/HooksUseMemo";
import HookUseLayoutEffect from "../components/HookUseLayoutEffect";
import HookCustom from "../components/HookCustom";

const Home = () => {
  const { contextValue } = useContext(SomeContext);
  return (
    <div>
      <HooksUseState />
      <HookUseReducer />
      <HookUseEffect />
      <h2> useContext</h2>
      <p> Valor do Context:{contextValue}</p>
      <hr />
      <HookUseRef />
      <HookUseCallback />
      <HooksUseMemo />
      <HookUseLayoutEffect />
      <HookCustom />
    </div>
  );
};

export default Home;
