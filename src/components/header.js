import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import FlowerIcon from "../svg/flower.svg";

// Context
import LayoutContext from "../context/layout";

// Utils
import { responsive } from "../utils/style";

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

  color: ${(p) => (p.scrolled ? "black" : "white")};
  background-color: ${(p) => (p.scrolled ? "#f1f1f1" : "")};
  border-color: ${(p) => (p.scrolled ? "black" : "white")};

  ${(p) => (p.scrolled ? "cursor: pointer" : "")};

  transition: height 0.3s ease-in-out, background-color 0.3s ease-in-out;

  height: ${(p) => (p.scrolled ? "50px" : "70px")};
  padding: 0 20px;

  ${responsive.sm`
    height: ${(p) => (p.scrolled ? "60px" : "90px")};
    padding: 0 50px;
  `};

  h1 {
    transition: all 0.3s ease-in-out;
  }
`;

const PopulationContainer = styled.div`
  display: none;
  align-items: center;

  ${responsive.sm`
    display: flex;
  `}

  opacity: ${(p) => (p.scrolled ? 0 : 1)};
  transition: opacity 0.3s ease;

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

const Established = styled.div`
  display: block;
  margin-right: 5px;

  svg {
    display: block;
    width: 25px;
    height: 25px;
    animation: ${spin} 6s linear infinite;
  }
`;

export default function Header() {
  const { scrolled } = useContext(LayoutContext);

  function handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <HeaderWrapper onClick={handleClick}>
      <HeaderContainer scrolled={scrolled}>
        <h1 className={scrolled ? "text" : "text-big"}>Lian</h1>
        <PopulationContainer scrolled={scrolled}>
          <Established>
            <FlowerIcon />
          </Established>
          <h2 className="text">est. 1992 Pop. 1</h2>
        </PopulationContainer>
        <h1 className={scrolled ? "text" : "text-big"}>Land</h1>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
