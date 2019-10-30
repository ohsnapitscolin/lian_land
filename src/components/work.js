import React from "react"
import styled from 'styled-components';
import { responsive, breakpoints } from "../utils/style";
import Img from "gatsby-image";
import Ticker from "react-ticker";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
`;

const WorkHeadline = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 24px;
  padding-right: 116px;

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

  padding-top: 18px;
  ${responsive.sm`
    padding-top: 32px;
  `}

  .credits {
    text-align: center;
  }
`;

const WorkDoodleImage = styled.div`
  width: 40px;

  ${responsive.sm`
    height: 80px;
    width: 80px;
  `}

  /* .gatsby-image-wrapper {
    width: 100% !important;
  }; */
`;

// const WorkDoodle = styled.div`
//   display: flex;
//   align-items: center;
//
//   padding-left: 10px;
//   padding-right: 8px;
//
//   width: 40px;
//   height: 40px;
//
//   background-image: url(${});
//   background-repeat: no-repeat;
//   background-center:
//   background-size: 40px;
//
//   ${responsive.sm`
//     padding-left: 15px;
//     padding-right: 10px;
//   `}
//
//   img {
//     height: 25px;
//
//     ${responsive.sm`
//       height: 40px;
//     `}
//
//   }
// `;


export default class Work extends React.Component {
  render() {
    let {
      title,
      type,
      year,
      images,
      doodle,
      description,
      credits
    } = this.props;

    return (
      <WorkWrapper>
        <WorkHeadlineContainer>
          <Ticker
            speed={SCROLL_SPEED}
            mode={"chain"}
          >
            {({ index }) => (
              <WorkHeadline>
                <WorkTitle>
                  <h1>{title}</h1>
                </WorkTitle>
                <WorkDoodleImage>
                  {doodle && <Img
                    fixed={doodle.fixed}
                    style={{
                      height: "100%",
                      width: "100%"
                    }}
                    imgStyle={{objectFit: "contain"}}/>}
                </WorkDoodleImage>
                <WorkType>
                  <h1><i>{type}, {year}</i></h1>
                </WorkType>
              </WorkHeadline>
            )}
          </Ticker>
        </WorkHeadlineContainer>
        <WorkCarousel images={images} />
        {description && <WorkDescription>
          <div className="description">
            {documentToReactComponents(description.json)}
          </div>
        </WorkDescription>}
        {credits && <WorkCredits>
          <div className="credits">
            {documentToReactComponents(credits.json)}
          </div>
        </WorkCredits>}
      </WorkWrapper>
    );
  }
}

// const WorkDoodle = styled(Img)`
//   picture > img {
//     height: 100% !important;
//   };
//   picture {
//     height: 100% !important;
//   };
// `;
