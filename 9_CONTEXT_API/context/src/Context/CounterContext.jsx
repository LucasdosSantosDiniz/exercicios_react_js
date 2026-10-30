import { createContext, useState } from "react";

//  Criação do context
export const CounterContext = createContext();

// Criando Provider
export const CounterContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
};
