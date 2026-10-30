import { useDebugValue, useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();

  useDebugValue(" --- CUSTOM DEBUG VALUE -----");
  useDebugValue(`O número anterior é: ${value}`);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
