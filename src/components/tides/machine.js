import React from "react";
import styled, { keyframes } from "styled-components";

import { BackgroundGradient, TideGradient } from "../../constants/tides";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${(p) =>
    `linear-gradient(${p.gradient[1]} 25%, ${p.gradient[0]} 50%)`};
  overflow: hidden;
`;

const wobble = keyframes`
  0% {
    transform: translate(-50%, -48%);
  }
  100% {
    transform: translate(-50%, -52%);
  }
`;

const Tide = styled.div`
  width: 125%;
  min-width: 1000px;
  height: ${(p) => `${(p.height / 100) * 175}vh`};
  position: ${(p) => (p.fixed ? "fixed" : "absolute")};
  left: 50%;
  top: 100%;
  background: ${(p) =>
    `linear-gradient(${p.gradient[2]} 5%, ${p.gradient[1]} 35%, ${p.gradient[0]} 50%)`};
  border-radius: 50%;
  animation: ${wobble} 6s ease-in-out infinite alternate;
`;

function toRGB(gradient) {
  return gradient.map((tuple) => `rgb(${tuple[0]}, ${tuple[1]}, ${tuple[2]})`);
}

const Machine = ({ timeOfDay, season, height = 50, fixed = false }) => {
  return (
    <Background gradient={toRGB(BackgroundGradient[timeOfDay][season])}>
      <Tide
        gradient={toRGB(TideGradient[timeOfDay][season])}
        height={height}
        fixed={fixed}
      />
    </Background>
  );
};

export default Machine;
