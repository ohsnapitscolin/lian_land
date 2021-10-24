import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styles
import "../style/layout.scss";

// Components
import Header from "./header";
import Footer from "./footer";
import Credits from "./credits";
import Seo from "./seo";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

// Utils
import { breakpoints } from "../utils/style";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export default function Layout(props) {
  const [scrolled, setScrolled] = useState(false);
  const [breakpoint, setBreakpoint] = useState(Breakpoints.XS);

  useEffect(() => {
    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  });

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

  const footer = props.data.allContentfulFooter.edges[0].node;
  const credits = props.data.allContentfulCredits.edges[0].node;

  return (
    <LayoutContext.Provider value={{ scrolled, breakpoint }}>
      <LayoutWrapper>
        <Seo />
        <Header />
        {props.children}
        <Footer contactText={footer.contactText} aboutText={footer.aboutText} />
        <Credits image={credits.image} text={credits.text} />
      </LayoutWrapper>
    </LayoutContext.Provider>
  );
}
