import React, { useState, useContext, useEffect } from "react";
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
  width: 0;

  ${responsive.sm`
    display: block;
    width: 100px;
  `}

  ${responsive.md`
    width: 150px;
  `}

  ${responsive.lg`
    width: 200px;
  `}
`;

const LeftButton = styled(UpdateButton)`
  top: 0;
  left: 0;
`;

const RightButton = styled(UpdateButton)`
  top: 0;
  right: 0;

  display: block;
  width: 30px;
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
  const { entries, identifier } = props;

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
    const entryIndex = params.index % size;

    const entry = entries[entryIndex];
    const key = `${identifier}_${params.key}`;

    const showContent = seen || entryIndex === 0;

    return (
      <AspectRatioBox id={key} key={key} size={size}>
        <SlideWrapper>
          {showContent && entry.image && <ImageSlide image={entry.image} />}
          {showContent && entry.video && <VideoSlide video={entry.video} />}
        </SlideWrapper>
      </AspectRatioBox>
    );
  }

  const beforeCount = Math.floor(size / 2);
  const afterCount = Math.floor(size / 2);

  return (
    <CarouselWrapper ref={ref}>
      <Scrollable
        inline={getInline()}
        index={index}
        onChangeIndex={onChangeIndex}
      >
        {entries.map((entry, i) => {
          return renderSlides({ index: i, key: i });
        })}
      </Scrollable>
      {!!beforeCount && (
        <LeftButton onClick={decrementIndex}>Previous</LeftButton>
      )}
      {!!afterCount && <RightButton onClick={incrementIndex}>Next</RightButton>}
    </CarouselWrapper>
  );
}
