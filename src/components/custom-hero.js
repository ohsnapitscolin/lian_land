import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(#f3f3d5 25%, #dfc6c3 50%);
`;

const wobble = keyframes`
  0% {
    transform: translate(-50%, -48%);
  }
  100% {
    transform: translate(-50%, -52%);
  }
`;

const rise = keyframes`
  0% {
    height: 25%;
  }
  100% {
    height: 175%;
  }
`;

const Tide = styled.div`
  width: 125%;
  min-width: 1000px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 100%;
  background: linear-gradient(#ccfbe5 5%, #078db8 35%, #011d41 50%);
  border-radius: 50%;
  animation: ${wobble} 6s ease-in-out infinite alternate;
`;

const CustomHero = () => {
  return (
    <Background>
      <Tide />
    </Background>
  );
};

export default CustomHero;
