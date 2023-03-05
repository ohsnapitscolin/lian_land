import React, { forwardRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import Scrollable from "./scrollable";

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
  border-bottom: solid 1px black;
`;

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
`;

const LeftButton = styled(UpdateButton)`
  top: 0;
  left: 0;

  ${responsive.sm`
    display: block;
    width: ${(p) => `${p.width}px`};
  `}
`;

const RightButton = styled(UpdateButton)`
  top: 0;
  right: 0;

  display: block;
  width: ${(p) => `${p.width}px`};
`;

const AspectRatioBox = styled.div`
  overflow: hidden;
  position: relative;

  border-left: solid ${(p) => (p.size > 1 ? "0px" : "1px")} black;
  border-right: solid 1px black;

  width: 90vw;
  height: calc(0.625 * 90vw);

  ${responsive.sm`
    width: 75vw;
    height: calc(0.625 * 75vw);
  `}
`;

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function WorkCarousel(props) {
  const { entries } = props;

  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(false);

  const { breakpoint } = useContext(LayoutContext);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!seen && inView) setSeen(true);
  }, [inView, seen]);

  const size = entries.length;

  function getInline() {
    switch (breakpoint) {
      case Breakpoints.Small:
      case Breakpoints.Medium:
      case Breakpoints.Large:
        return "center";
      default:
        return "start";
    }
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

  const beforeCount = Math.floor(size / 2);
  const afterCount = Math.floor(size / 2);
  const { left, right } = getPadding();

  return (
    <CarouselWrapper ref={ref}>
      <Scrollable
        inline={getInline()}
        index={index}
        onChangeIndex={onChangeIndex}
      >
        {entries.map((entry, i) => (
          <Slide key={i} entry={entry} size={size} inView={inView} />
        ))}
      </Scrollable>
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

const Slide = forwardRef(({ entry, size, inView }, ref) => {
  return (
    <AspectRatioBox ref={ref} size={size}>
      <SlideWrapper>
        {entry.image && <ImageSlide image={entry.image} />}
        {entry.video && <VideoSlide video={entry.video} />}
      </SlideWrapper>
    </AspectRatioBox>
  );
});
