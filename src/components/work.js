import React from "react"
import styled from 'styled-components';
import { responsive, breakpoints } from "../utils/style";
import Ticker from "react-ticker";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import WorkCarousel from "./WorkCarousel";

const WorkHeadlineContainer = styled.div`
  height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;

  ${responsive.sm`
    height: 80px;
    padding-top: 16px;
  `}
`;

const WorkHeadline = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 24px;
  padding-right: 24px;
`;

const WorkWrapper = styled.div`
  width: 100%;
  padding-bottom: 90px;
  ${responsive.sm`
    padding-bottom: 160px;
  `};
  border-bottom: black solid 1px;
`;

const WorkTitle = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-right: 30px;
`;

const WorkType = styled.div`
  display: inline-block;
  white-space: nowrap;
  h1 {
    font-family: adobe-garamond-pro, serif;
    font-style: italic;
    font-weight: 400;
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

  padding-top: 18px;
  ${responsive.sm`
    padding-top: 32px;
  `}

  .credits {
    text-align: center;
  }
`;

export default class Work extends React.Component {
  render() {
    let {
      title,
      type,
      year,
      images,
      description,
      credits
    } = this.props;

    return (
      <WorkWrapper>
        <WorkHeadlineContainer>
          <Ticker
            speed={10}
            mode={"chain"}
          >
            {({ index }) => (
              <WorkHeadline>
                <WorkTitle>
                  <h1>{title}</h1>
                </WorkTitle>
                <WorkType>
                  <h1>{type}, {year}</h1>
                </WorkType>
              </WorkHeadline>
            )}
          </Ticker>
        </WorkHeadlineContainer>
        <WorkCarousel images={images} />
        <WorkDescription>
          <div className="description">
            {documentToReactComponents(description.json)}
          </div>
        </WorkDescription>
        <WorkCredits>
          <div className="credits">
            {documentToReactComponents(credits.json)}
          </div>
        </WorkCredits>
      </WorkWrapper>
    );
  }
}
//
// <div
//   dangerouslySetInnerHtml={this.props.description.childMarkdownRemark.html}
// />
