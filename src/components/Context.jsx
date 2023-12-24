import React from "react";
import { createContext, useContext } from "react";

const MyContext = createContext();
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a myContextProvider");
  }
  return context;
};

export default MyContext;
