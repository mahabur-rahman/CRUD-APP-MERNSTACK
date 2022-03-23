import React, { useState, createContext } from "react";

export const addData = createContext();

const ContextProvider = ({ children }) => {
  const [uData, setUData] = useState("");

  return (
    <addData.Provider value={{ uData, setUData }}>{children}</addData.Provider>
  );
};

export default ContextProvider;
