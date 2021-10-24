import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { mod } from "react-swipeable-views-core";

// Components
import Carousel from "./carousel";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

const AspectRatioBox = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: calc(0.62 * 100%);
  position: relative;

  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
  box-sizing: border-box;
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

  function getFormattedPadding() {
    const { left, right } = getPadding();
    return {
      paddingLeft: `${left}px`,
      paddingRight: `${right}px`
    };
  }

  function getPadding() {
    switch (breakpoint) {
      case Breakpoints.Small:
        return { left: 100, right: 100 };
      case Breakpoints.Medium:
        return { left: 150, right: 150 };
      case Breakpoints.Large:
        return { left: 200, right: 200 };
      default:
        return { left: 0, right: 20 };
    }
  }

  function renderSlides(params, activeIndex) {
    const size = entries.length;
    const entryIndex = mod(params.index, size);

    const entry = entries[entryIndex];
    const active = params.index === activeIndex;
    const key = `${identifier}_${params.key}`;

    return (
      <AspectRatioBox key={key} size={size}>
        <SlideWrapper>
          {entry.image && <ImageSlide image={entry.image} active={active} />}
          {entry.video && <VideoSlide video={entry.video} active={active} />}
        </SlideWrapper>
      </AspectRatioBox>
    );
  }

  const rootStyle = getFormattedPadding();

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
    <GatsbyImage
      image={getImage(image) || ""}
      alt={image.description}
      loading="lazy"
    />
  );
}

function VideoSlide({ video, active }) {
  const videoRef = useRef(null);

  // if (videoRef.current) {
  //   if (active) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //   }
  // }

  active = true;
  const file = video.source.file;

  return (
    <VideoWrapper>
      <Video
        loop={true}
        muted
        autoPlay={active}
        playsInline={active}
        ref={videoRef}
      >
        <source src={file.url} type={file.contentType} />
      </Video>
    </VideoWrapper>
  );
}
