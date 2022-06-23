import { createContext } from "react";

export const UidContext = createContext();

const theme = {
  basic: {
    background: "#000",
    color: "#FFF",
  },
};
export const ThemeContext = createContext(theme.basic);
