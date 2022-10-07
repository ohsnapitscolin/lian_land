import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { TimeOfDay, Season } from "../constants/tides";

// Component
import Layout from "../components/layout";
import Seo from "../components/seo";
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
  bottom: env;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  padding: 15px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 145px;
  padding-bottom: 240px;

  ${responsive.sm`
    flex-direction: row;
    padding-bottom: 80px;
  `}
`;

const LocationGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 60px;
  margin: 0 0 60px 0;

  ${responsive.sm`
    width: calc(100% * 2 / 3);
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin: 0 40px 0 0;
  `}
`;

const USGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: start;

  ${responsive.sm`
    width: calc(100% / 3);
    grid-template-columns: 1f;
    gap: 40px;
  `}
`;

const LocationContainer = styled.div`
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

  &:hover {
    text-decoration: underline;
  }
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
  z-index: 1;
`;

const BottomBanner = styled(Banner)`
  position: absolute;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 1;

  color: white;

  ${responsive.sm`
    position: fixed;
  `}
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
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
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

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
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

  const nonUsLocations = locations.slice(0, locations.length - 1);
  const usLocation = locations[locations.length - 1];

  return (
    <Layout>
      <Seo />
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
          <GridContainer>
            <LocationGrid>
              {nonUsLocations.map((location) => (
                <Location key={location.title} location={location} />
              ))}
            </LocationGrid>
            <USGrid>
              <Location location={usLocation} />
            </USGrid>
          </GridContainer>
        </Content>
        <BottomBanner>
          <Download>
            *To obtain a download password or create a custom tide station,
            kindly order here.
          </Download>
          <MoreInfoButton>
            <button onClick={toggleMoreInfo}>More info ?</button>
          </MoreInfoButton>
        </BottomBanner>
      </Wrapper>
    </Layout>
  );
}

const Location = ({ location }) => {
  return (
    <LocationContainer>
      <LocationTitle>{location.title}</LocationTitle>
      {location.locations.map((l) => (
        <LocationLink key={l.title} href={l.link} target="_blank">
          {l.title}
        </LocationLink>
      ))}
    </LocationContainer>
  );
};

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
