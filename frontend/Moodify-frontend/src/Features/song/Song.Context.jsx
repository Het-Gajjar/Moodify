
import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setsong] = useState({});

  return (
    <SongContext.Provider value={{ song, setsong }}>
      {children}
    </SongContext.Provider>
  );
};
