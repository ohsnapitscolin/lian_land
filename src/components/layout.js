import React, { useState } from "react";
import throttle from "lodash/throttle";

// Styles
import "../style/layout.scss";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

// Hooks
import useResize from "../hooks/resize";
import useScroll from "../hooks/scroll";

// Utils
import { breakpoints } from "../utils/style";

export default function Layout(props) {
  const [scrolled, setScrolled] = useState(false);
  const [breakpoint, setBreakpoint] = useState(Breakpoints.XS);

  useScroll(throttle(handleScroll, 250));
  useResize(throttle(handleResize, 500));

  function handleResize() {
    if (window.innerWidth < breakpoints.sm) {
      setBreakpoint(Breakpoints.XS);
    } else if (window.innerWidth < breakpoints.md) {
      setBreakpoint(Breakpoints.Small);
    } else if (window.innerWidth < breakpoints.lg) {
      setBreakpoint(Breakpoints.Medium);
    } else {
      setBreakpoint(Breakpoints.Large);
    }
  }

  function handleScroll() {
    setScrolled(window.scrollY >= 56);
  }

  return (
    <LayoutContext.Provider value={{ scrolled, breakpoint }}>
      {props.children}
    </LayoutContext.Provider>
  );
}
