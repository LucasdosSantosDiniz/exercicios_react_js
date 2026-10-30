import { useContext } from "react";
import { CounterContext } from "../Context/CounterContext";

const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (!context) {
    console.log(" Erro ao carregar dados !");
  }
  return context;
};

export default useCounterContext;
