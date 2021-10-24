import React, { useState } from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { responsive } from "../utils/style";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const UpdateButton = styled.div`
  position: absolute;
  height: 100%;
  cursor: pointer;

  display: none;

  ${responsive.sm`
    display: block;
    width: 100px;
  `}
  
  ${responsive.md`
    width: 150px;
  `}
  
  ${responsive.lg`
    width: 200px;
  `};
`;

const LeftButton = styled(UpdateButton)`
  top: 0;
  left: 0;
`;

const RightButton = styled(UpdateButton)`
  top: 0;
  right: 0;
`;

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const { rootStyle, size } = props;

  function renderSlides(params) {
    return props.renderSlides(params, index);
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

  const beforeCount = size > 1 ? 2 : 0;
  const afterCount = size > 1 ? 2 : 0;

  return (
    <CarouselWrapper>
      <EnhancedSwipeableViews
        index={index}
        onChangeIndex={onChangeIndex}
        style={rootStyle}
        overscanSlideBefore={beforeCount}
        overscanSlideAfter={afterCount}
        enableMouseEvents={true}
        slideRenderer={renderSlides}
      />
      {!!beforeCount && <LeftButton onClick={decrementIndex} />}
      {!!afterCount && <RightButton onClick={incrementIndex} />}
    </CarouselWrapper>
  );
}
