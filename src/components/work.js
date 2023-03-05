import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useInView } from "react-intersection-observer";
import Ticker from "react-ticker";

// Utils
import { responsive } from "../utils/style";
import renderRichText from "../utils/rich-text";

// Components
import Carousel from "./carousel";

const SCROLL_SPEED = 5;

const WorkHeadlineContainer = styled.div`
  border-bottom: black solid 1px;
  height: 50px;

  ${responsive.sm`
    height: 60px;
  `}
`;

const WorkHeadline = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-right: 30px;

  ${responsive.sm`
    padding-right: 62px;
  `}
`;

const WorkWrapper = styled.div`
  width: 100%;
  border-bottom: black solid 1px;
`;

const WorkTitle = styled.div`
  display: inline-block;
  white-space: nowrap;

  padding-right: 30px;

  ${responsive.sm`
    padding-right: 62px;
  `}
`;

const WorkContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 17px 20px 70px 20px;

  ${responsive.sm`
    flex-direction: row;
    padding: 26px 50px 100px 50px;
  `}
`;

const WorkDescription = styled.div`
  margin-bottom: 17px;

  ${responsive.sm`
    flex: 0 0 50%;
    margin-bottom: 0;
  `}
`;

const WorkCredits = styled.div`
  ${responsive.sm`
    flex: 0 0 50%;
    padding-left: 9%;
    padding-right: 9%;
  `}

  p {
    margin-bottom: 7px;
  }
`;

const WorkDoodleContainer = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${responsive.sm`
    height: 60px;
    width: 60px;
  `}
`;

const WorkDoodleImage = styled.div`
  width: 25px;
  height: 25px;

  ${responsive.sm`
    height: 25px;
    width: 25px;
  `}
`;

export default function Work({ work }) {
  const { title, type, year, entries, doodle, description, credits } = work;
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <WorkWrapper ref={ref}>
      <WorkHeadlineContainer>
        <Ticker speed={inView ? SCROLL_SPEED : 0} mode={"chain"}>
          {() => (
            <WorkHeadline>
              <WorkTitle>
                <h1 className="text">
                  {title} — {type} — {year}
                </h1>
              </WorkTitle>
              <WorkDoodleContainer>
                <WorkDoodleImage>
                  {doodle && (
                    <GatsbyImage
                      image={getImage(doodle)}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      imgStyle={{ objectFit: "contain" }}
                    />
                  )}
                </WorkDoodleImage>
              </WorkDoodleContainer>
            </WorkHeadline>
          )}
        </Ticker>
      </WorkHeadlineContainer>
      <Carousel identifier={work.contentful_id} entries={entries} />
      <WorkContent>
        <WorkDescription>
          {description && (
            <div className="text-m">{renderRichText(description.raw)}</div>
          )}
        </WorkDescription>
        <WorkCredits>
          {credits && (
            <div className="text-small">{renderRichText(credits.raw)}</div>
          )}
        </WorkCredits>
      </WorkContent>
    </WorkWrapper>
  );
}
