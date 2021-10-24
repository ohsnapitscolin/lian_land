import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

const CreditsWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border-top: solid 1px black;

  height: 270px;
  ${responsive.sm`
    height: 200px;
  `}
`;

const CreditsContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-left: 20px;
  padding-right: 20px;

  ${responsive.sm`
    flex-direction: row;
    align-items: center;
    padding-left: 45px;
    padding-right: 45px;
  `}
`;

const CreditsImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CreditsCTA = styled.button`
  background: none;
  appearance: none;
  border: 0;
  padding: 0;

  display: flex;
  align-items: center;

  z-index: 1;
  cursor: pointer;

  padding-top: 34px;

  h1 {
    margin-right: 15px;
  }

  ${responsive.sm`
    padding-top: 0;
  `}

  img {
    height: 20px;

    ${responsive.sm`
      height: 30px;
    `}
  }
`;

const CreditsText = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
  z-index: 1;

  max-width: 450px;

  ${responsive.sm`
    text-align: right;
  `}
`;

export default function Credits(props) {
  const { image, text } = props;

  function handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  return (
    <CreditsWrapper>
      <CreditsContentWrapper>
        <CreditsImageWrapper>
          <GatsbyImage
            image={getImage(image)}
            alt={image.description || ""}
            loading="eager"
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </CreditsImageWrapper>
        <CreditsCTA onClick={handleClick}>
          <h1>Entrance</h1>
          <StaticImage
            src="../images/ic_arrow.png"
            placeholder="none"
            alt="Return to entrance"
            imgStyle={{
              transform: "rotate(270deg)"
            }}
          />
        </CreditsCTA>
        <CreditsText
          dangerouslySetInnerHTML={{
            __html: text.childMarkdownRemark.html
          }}
        />
      </CreditsContentWrapper>
    </CreditsWrapper>
  );
}
