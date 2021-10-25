import React, { useState, useContext } from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";

// Components
import ImageSlide from "./slides/image";
import VideoSlide from "./slides/video";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

// Utils
import { responsive } from "../utils/style";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const UpdateButton = styled.button`
  position: absolute;
  height: 100%;
  cursor: pointer;

  font-size: 0;

  appearance: none;
  background: none;
  border: 0;
  padding: 0;

  display: none;

  ${responsive.sm`
    display: block;
    width: ${p => `${p.width}px`};
  `}
`;

const LeftButton = styled(UpdateButton)`
  top: 0;
  left: 0;
`;

const RightButton = styled(UpdateButton)`
  top: 0;
  right: 0;
`;

const AspectRatioBox = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: calc(0.62 * 100%);
  position: relative;

  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function WorkCarousel(props) {
  const { entries, identifier } = props;
  const [index, setIndex] = useState(0);
  const { breakpoint } = useContext(LayoutContext);

  const size = entries.length;

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

  function incrementIndex() {
    setIndex(index + 1);
  }

  function decrementIndex() {
    setIndex(index - 1);
  }

  function onChangeIndex(i) {
    setIndex(i);
  }

  function renderSlides(params) {
    const entryIndex = mod(params.index, size);

    const entry = entries[entryIndex];
    const key = `${identifier}_${params.key}`;

    return (
      <AspectRatioBox key={key} size={size}>
        <SlideWrapper>
          {entry.image && <ImageSlide image={entry.image} />}
          {entry.video && <VideoSlide video={entry.video} />}
        </SlideWrapper>
      </AspectRatioBox>
    );
  }

  const beforeCount = size > 1 ? 2 : 0;
  const afterCount = size > 1 ? 2 : 0;

  const { left, right } = getPadding();

  return (
    <CarouselWrapper>
      <EnhancedSwipeableViews
        index={index}
        onChangeIndex={onChangeIndex}
        style={getFormattedPadding()}
        overscanSlideBefore={beforeCount}
        overscanSlideAfter={afterCount}
        enableMouseEvents={true}
        slideRenderer={renderSlides}
      />
      {!!beforeCount && (
        <LeftButton onClick={decrementIndex} width={left}>
          Previous
        </LeftButton>
      )}
      {!!afterCount && (
        <RightButton onClick={incrementIndex} width={right}>
          Next
        </RightButton>
      )}
    </CarouselWrapper>
  );
}
