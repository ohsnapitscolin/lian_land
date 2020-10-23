import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";
import Img from "gatsby-image";
import Ticker from "react-ticker";
import renderRichText from "../utils/rich-text";

import WorkCarousel from "./workCarousel";

const SCROLL_SPEED = 5;

const WorkHeadlineContainer = styled.div`
  height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;

  ${responsive.sm`
    height: 80px;
    padding-top: 16px;
  `}

  border-bottom: black solid 1px;
`;

const WorkHeadline = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 24px;
  padding-right: 200px;

  ${responsive.sm`
    padding-right: 256px;
  `}
`;

const WorkWrapper = styled.div`
  width: 100%;
  padding-bottom: 100px;
  ${responsive.sm`
    padding-bottom: 150px;
  `};
  ${responsive.md`
    padding-bottom: 160px;
  `};
  border-bottom: black solid 1px;
`;

const WorkTitle = styled.div`
  display: inline-block;
  white-space: nowrap;
`;

const WorkType = styled.div`
  display: inline-block;
  white-space: nowrap;

  h1 {
    padding-top: 5px;
  }
`;

const WorkDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 28px;

  ${responsive.sm`
    padding-top: 56px;
  `}

  .description {
    padding-left: 20px;
    padding-right: 20px;

    ${responsive.sm`
      padding-left: 50px;
      padding-right: 50px;
    `};

    ${responsive.md`
      padding-left: 200px;
      padding-right: 200px;
    `};

    text-align: center;
  }
`;

const WorkCredits = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 8px;
  padding-right: 20px;
  padding-left: 20px;

  box-sizing: border-box;

  ${responsive.sm`
    padding-top: 12px;
  `}

  .credits {
    text-align: center;
  }
`;

const WorkDoodleImage = styled.div`
  width: 40px;
  height: 40px;

  ${responsive.sm`
    height: 80px;
    width: 80px;
  `}
`;

export default class Work extends React.Component {
  render() {
    let {
      title,
      type,
      year,
      entries,
      doodle,
      description,
      credits
    } = this.props;

    return (
      <WorkWrapper>
        <WorkHeadlineContainer>
          <Ticker speed={SCROLL_SPEED} mode={"chain"}>
            {({ index }) => (
              <WorkHeadline>
                <WorkTitle>
                  <h1>{title}</h1>
                </WorkTitle>
                <WorkDoodleImage>
                  {doodle && (
                    <Img
                      fixed={doodle.fixed}
                      style={{
                        height: "100%",
                        width: "100%"
                      }}
                      imgStyle={{ objectFit: "contain" }}
                    />
                  )}
                </WorkDoodleImage>
                <WorkType>
                  <h1>
                    <i>
                      {type}, {year}
                    </i>
                  </h1>
                </WorkType>
              </WorkHeadline>
            )}
          </Ticker>
        </WorkHeadlineContainer>
        <WorkCarousel entries={entries} />
        {description && (
          <WorkDescription>
            <div className="description">
              {renderRichText(description.json)}
            </div>
          </WorkDescription>
        )}
        {credits && (
          <WorkCredits>
            <div className="credits">{renderRichText(credits.json)}</div>
          </WorkCredits>
        )}
      </WorkWrapper>
    );
  }
}
