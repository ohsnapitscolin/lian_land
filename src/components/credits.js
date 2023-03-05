import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const CreditsWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border-top: solid 1px black;

  height: 250px;

  ${responsive.sm`
    height: 200px;
  `}

  padding-bottom: env(safe-area-inset-bottom);
`;

const CreditsContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px 40px;

  ${responsive.sm`
    flex-direction: row;
    align-items: center;
    padding: 0 50px;
  `};

  button {
    color: inherit;
  }
`;

const CreditsImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const CreditsText = styled.div`
  text-align: left;
  padding-right: 30px;

  ${responsive.sm`
    text-align: right;
    padding-right: 0;
  `}
`;

export default function Credits(props) {
  const { image, text } = props;

  function handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
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
              height: "100%",
            }}
          />
        </CreditsImageWrapper>
        <button onClick={handleClick}>
          <span className="text-big">Entrance ↑</span>
        </button>
        <CreditsText
          className="text-m"
          dangerouslySetInnerHTML={{
            __html: text.childMarkdownRemark.html,
          }}
        />
      </CreditsContentWrapper>
    </CreditsWrapper>
  );
}
