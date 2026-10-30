import { createContext, useReducer } from "react";

export const TitleColorContext = createContext();

export const titleColorReducer = (state, action) => {
  //switch
  switch (action.type) {
    case "YELLOW":
      return { ...state, color: "yellow" };
    case "GREEN":
      return { ...state, color: "green" };
    default:
      return state;
  }
};

export const TitleColorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(titleColorReducer, { color: "blue" });
  console.log("Title on context :", state);
  return (
    <TitleColorContext.Provider value={{ ...state, dispatch }}>
      {children}{" "}
    </TitleColorContext.Provider>
  );
};
