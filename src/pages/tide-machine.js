import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { TimeOfDay, Season } from "../constants/tides";

// Component
import Machine from "../components/tides/machine";

// Utils
import { responsive } from "../utils/style";
import renderRichText from "../utils/rich-text";

const Wrapper = styled.div`
  position: relative;
  height: auto;
  min-height: 100%;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  padding: 15px;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  margin-top: 145px;
  padding-bottom: 300px;

  ${responsive.sm`
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  `}
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: start;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LocationTitle = styled.h3`
  font-size: 14px;
  line-height: 17px;
  font-weight: 510;
  margin-bottom: 17px;
`;

const LocationLink = styled.a`
  text-decoration: none;

  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
`;

const Span = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 17px;
  font-weight: 510;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;

  ${responsive.sm`
  flex-direction: row;
  justify-content: space-between;
`}

  width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const TopBanner = styled(Banner)`
  position: absolute;
  top: 0;
  left: 0;
`;

const BottomBanner = styled(Banner)`
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
`;

const Title = styled(Span)`
  margin-bottom: 17px;

  ${responsive.sm`
    margin-bottom: 0;
  `}
`;

const Info = styled(Span)``;

const Download = styled(Span)`
  order: 1;

  ${responsive.sm`
    order: 0;
  `}
`;

const MoreInfoButton = styled(Span)`
  order: 0;
  margin-bottom: 17px;

  ${responsive.sm`
    order: 1;
    margin-bottom: 0;
  `}

  button {
    color: white;
    padding: 0;
    border: 0;
    background: none;
  }
`;

const MoreInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreInfoText = styled.div`
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;

  p {
    color: white;
    text-align: center;
  }
`;

const CloseButton = styled(Span)`
  position: fixed;
  top: 15px;
  right: 15px;

  button {
    color: white;
    padding: 0;
    border: 0;
    background: none;
  }
`;

export default function TideMachine(props) {
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  const { locations, moreInfo } =
    props.data.allContentfulTideMachinePage.edges[0].node;

  const locationsCount = Object.values(locations).reduce(
    (sum, l) => sum + l.locations.length,
    0
  );

  function toggleMoreInfo() {
    setMoreInfoOpen(!moreInfoOpen);
  }

  if (moreInfoOpen) {
    return (
      <Wrapper>
        <Background>
          <Machine
            timeOfDay={TimeOfDay.Night}
            season={Season.Winter}
            height={85}
            fixed={true}
          />
        </Background>
        <MoreInfo>
          <MoreInfoText>{renderRichText(moreInfo.raw)}</MoreInfoText>
        </MoreInfo>
        <CloseButton>
          <button onClick={toggleMoreInfo}>Close</button>
        </CloseButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Background>
        <Machine
          timeOfDay={TimeOfDay.Evening}
          season={Season.Spring}
          height={35}
          fixed={true}
        />
      </Background>
      <TopBanner>
        <Title>
          Tide Machine Screensaver* <br /> (for mac OS v10.9+)
        </Title>
        <Info>Tide Machine currently has {locationsCount} stations.</Info>
      </TopBanner>
      <Content>
        <LocationGrid>
          {locations.map((location) => (
            <React.Fragment key={location.title}>
              <Location>
                <LocationTitle>{location.title}</LocationTitle>
                {location.locations.map((l) => (
                  <LocationLink key={l.title} href={l.link}>
                    {l.title}
                  </LocationLink>
                ))}
              </Location>
            </React.Fragment>
          ))}
        </LocationGrid>
      </Content>
      <BottomBanner>
        <Download>
          *To obtain a download password or create a custom tide station, kindly
          order here.
        </Download>
        <MoreInfoButton>
          <button onClick={toggleMoreInfo}>More info ?</button>
        </MoreInfoButton>
      </BottomBanner>
    </Wrapper>
  );
}
export const query = graphql`
  query TideMachineQuery {
    allContentfulTideMachinePage {
      edges {
        node {
          locations {
            title
            locations {
              title
              link
            }
          }
          moreInfo {
            raw
          }
        }
      }
    }
  }
`;
