import React from "react";
import styled from "styled-components";

// Styles
import "../style/layout.scss";

// Components
import Header from "./header";
import Footer from "./footer";
import Credits from "./credits";
import Seo from "./seo";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export default function Layout(props) {
  // componentDidMount() {
  //   window.addEventListener("resize", this.handleWindowResize);
  //   this.updateBreakpoint();
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.handleWindowResize);
  // }

  // handleWindowResize() {
  //   this.updateBreakpoint();
  // }

  // updateBreakpoint() {
  //   let breakpoint = breakpoints.lg;
  //   if (window.innerWidth < breakpoints.sm) {
  //     breakpoint = 0;
  //   } else if (window.innerWidth < breakpoints.md) {
  //     breakpoint = breakpoints.sm;
  //   } else if (window.innerWidth < breakpoints.lg) {
  //     breakpoint = breakpoints.md;
  //   }
  //   return new Promise(resolve => {
  //     this.setState(
  //       {
  //         breakpoint: breakpoint
  //       },
  //       resolve
  //     );
  //   });
  // }

  const footer = props.data.allContentfulFooter.edges[0].node;
  const credits = props.data.allContentfulCredits.edges[0].node;

  return (
    <LayoutWrapper>
      <Seo />
      <Header />
      {props.children}
      <Footer contactText={footer.contactText} aboutText={footer.aboutText} />
      <Credits image={credits.image} text={credits.text} />
    </LayoutWrapper>
  );
}
