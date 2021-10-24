import React from "react";
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

export default class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0
    };
  }

  updateIndex(change) {
    let index = this.state.index + change;
    this.setState({
      index: index
    });
  }

  onChangeIndex(index) {
    this.setState({
      index: index
    });
  }

  render() {
    let { rootStyle, renderSlides, size } = this.props;

    let beforeCount = size > 1 ? 2 : 0;
    let afterCount = size > 1 ? 2 : 0;

    return (
      <CarouselWrapper>
        <EnhancedSwipeableViews
          index={this.state.index}
          onChangeIndex={this.onChangeIndex.bind(this)}
          style={rootStyle}
          overscanSlideBefore={beforeCount}
          overscanSlideAfter={afterCount}
          enableMouseEvents={true}
          slideRenderer={params => {
            return renderSlides(params.index, params.key);
          }}
        />
        {!!beforeCount && <LeftButton onClick={() => this.updateIndex(-1)} />}
        {!!afterCount && <RightButton onClick={() => this.updateIndex(1)} />}
      </CarouselWrapper>
    );
  }
}
