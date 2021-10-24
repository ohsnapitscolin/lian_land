import { createContext } from "react";

export const Breakpoints = {
  XS: "xs",
  Small: "small",
  Medium: "medium",
  Large: "large"
};

const LayoutContext = createContext();

export default LayoutContext;
