import { useContext } from "react";
import { TitleColorContext } from "../Context/TitleColorContext";

const useTitleColorContext = () => {
  const context = useContext(TitleColorContext);
  if (!context) {
    console.log(" Erro ao carregar dados !");
  }
  return context;
};

export default useTitleColorContext;
