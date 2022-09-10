import React from "react";
import styled from "styled-components";
import { TimeOfDay, Season } from "../constants/tides";

// Component
import Machine from "../components/tides/machine";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default function TideMachine() {
  return (
    <Wrapper>
      <Machine
        timeOfDay={TimeOfDay.Evening}
        season={Season.Spring}
        height={75}
        fixed={true}
      />
    </Wrapper>
  );
}
