import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import CustomHero from "./custom-hero";

// Utils
import { responsive } from "../utils/style";
import renderRichText from "../utils/rich-text";

const HeroWrapper = styled.div``;

const HeroTextWrapper = styled.div`
  color: white;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  padding: 40px 20px;

  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${responsive.sm`
    top: unset;
    flex-direction: row;
    padding: 50px 50px 80px;
    justify-content: flex-start;
  `}
`;

const HeroMainText = styled.div`
  ${responsive.sm`
    flex: 0 0 50%;
  `}
`;

const HeroSubText = styled.div`
  padding-bottom: 80px;

  ${responsive.sm`
    flex: 0 0 50%;
    padding-left: 9%;
    padding-right: 9%;
    padding-bottom: 0;
  `}

  p {
    margin-bottom: 17px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const DownArrow = styled.div`
  margin-top: 10px;
  font-family: "Plaid";
  font-size: 26px;
  line-height: 31px;

  ${responsive.sm`
    display: none;
  `}
`;

const HeroImageWrapper = styled.div`
  position: relative;
  height: 100vh;
  border-bottom: black 1px solid;
  overflow: hidden;
`;

const TideMachine = false;

export default function Hero(props) {
  const { mainText, subText, image } = props;
  return (
    <HeroWrapper>
      <HeroImageWrapper>
        {TideMachine ? (
          <CustomHero />
        ) : (
          <GatsbyImage
            image={getImage(image)}
            alt={image.description || ""}
            loading="eager"
            style={{ height: "100%" }}
          />
        )}

        <HeroTextWrapper>
          <HeroMainText className="text">
            {renderRichText(mainText.raw)}
          </HeroMainText>
          <HeroSubText className="text-small">
            {renderRichText(subText.raw)}
            <DownArrow>↓</DownArrow>
          </HeroSubText>
        </HeroTextWrapper>
      </HeroImageWrapper>
    </HeroWrapper>
  );
}
