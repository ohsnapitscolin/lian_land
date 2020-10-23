import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";
import Img from "gatsby-image";
import renderRichText from "../utils/rich-text";

const HeroWrapper = styled.div``;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 20px;
  padding-right: 20px;

  ${responsive.sm`
    padding-left: 45px;
    padding-right: 45px;
  `}
`;

const HeroMainTextWrapper = styled(HeroTextWrapper)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 100%;
  box-sizing: border-box;
  max-width: 1100px;
`;

const HeroText = styled.div`
  width: 100%;
`;

const HeroMainText = styled(HeroText)``;

const HeroImageWrapper = styled.div`
  position: relative;
  height: 100vh;
  border-bottom: black 1px solid;
`;

export default class Hero extends React.Component {
  render() {
    let { mainText, image } = this.props;
    return (
      <HeroWrapper>
        <HeroImageWrapper>
          <Img
            fluid={image.fluid}
            alt={image.description}
            loading="eager"
            style={{ height: "100%" }}
          />
          <HeroMainTextWrapper>
            <HeroMainText>{renderRichText(mainText.json)}</HeroMainText>
          </HeroMainTextWrapper>
        </HeroImageWrapper>
      </HeroWrapper>
    );
  }
}
