import React, { useContext } from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { mod } from "react-swipeable-views-core";

// Components
import Carousel from "./carousel";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;

  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
  box-sizing: border-box;
`;

const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: calc(100% + 2px);
  margin-left: -1px;
  object-fit: cover;
`;

export default function WorkCarousel(props) {
  const { entries, identifier } = props;
  const { breakpoint } = useContext(LayoutContext);

  function getPadding() {
    switch (breakpoint) {
      case Breakpoints.Small:
        return {
          paddingLeft: "100px",
          paddingRight: "100px"
        };
      case Breakpoints.Medium:
        return {
          paddingLeft: "150px",
          paddingRight: "150px"
        };
      case Breakpoints.Large:
        return {
          paddingLeft: "200px",
          paddingRight: "200px"
        };
      default:
        return {
          paddingLeft: 0,
          paddingRight: "20px"
        };
    }
  }

  function renderSlides(params) {
    const size = entries.length;
    const entryIndex = mod(params.index, size);

    const entry = entries[entryIndex];
    const key = `${identifier}_${params.key}`;

    if (entry.image) {
      return <ImageSlide key={key} image={entry.image} />;
    } else if (entry.video) {
      return <VideoSlide key={key} video={entry.video} />;
    }
  }

  const rootStyle = getPadding();

  return (
    <Carousel
      rootStyle={rootStyle}
      renderSlides={renderSlides}
      size={entries.length}
    />
  );
}

function ImageSlide({ image }) {
  return (
    <SlideWrapper>
      <GatsbyImage
        image={getImage(image) || ""}
        alt={image.description}
        loading="lazy"
      />
    </SlideWrapper>
  );
}

function VideoSlide({ video }) {
  const file = video.source.file;
  return (
    <SlideWrapper>
      <VideoWrapper>
        <Video loop={true} muted autoPlay playsInline>
          <source src={file.url} type={file.contentType} />
        </Video>
      </VideoWrapper>
    </SlideWrapper>
  );
}
