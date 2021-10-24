import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

// Context
import LayoutContext from "../context/layout";

// Utils
import { responsive } from "../utils/style";

import est from "../images/ic_est.png";

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 999;
`;

const HeaderContainer = styled.header`
  max-height: 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  border-bottom: 1px solid black;

  background-color: ${p => (p.scrolled ? "#f1f1f1" : "")};

  ${p => (p.scrolled ? "cursor: pointer" : "")};

  transition: all 0.5s ease;

  height: ${p => (p.scrolled ? "64px" : "80px")};
  padding: 0 20px;

  ${responsive.sm`
    height: ${p => (p.scrolled ? "60px" : "96px")};
    padding: 0 45px;

    h1 {
      font-size: ${p => (p.scrolled ? "30px" : "45px")};
      transition: all 1s ease;
    }
  `};
`;

const PopulationContainer = styled.div`
  display: flex;
  align-items: center;

  opacity: ${p => (p.scrolled ? "0.0" : "1.0")};
  transition: opacity 0.75s ease;

  h2 {
    white-space: nowrap;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Established = styled.img`
  margin-right: 6px;
  height: 25px;

  display: block;

  ${responsive.sm`
    margin-right: 10px;
    height: 36px;
  `};

  animation: ${spin} 6s linear infinite;
`;

export default function Header() {
  const { scrolled } = useContext(LayoutContext);

  function handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  return (
    <HeaderWrapper onClick={handleClick}>
      <HeaderContainer scrolled={scrolled}>
        <h1>Lian</h1>
        <PopulationContainer scrolled={scrolled}>
          <Established src={est} alt="Established" />
          <h2>1992 Pop. 1</h2>
        </PopulationContainer>
        <h1>Land</h1>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
