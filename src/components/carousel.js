import React from 'react';
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { responsive, breakpoints } from "../utils/style"

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
  `} ${responsive.md`
    width: 150px;
  `} ${responsive.lg`
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
       index: 0,
    };
  }

  updateIndex(change, size) {
    let index = this.state.index + change;
    this.setState({
      index: index
    });
  }

  onChangeIndex(index) {
    this.setState({
      index: index
    });
  };

  render() {
    let {
      elements,
      style,
      rootStyle,
      slideStyle,
      renderSlides,
      size
    } = this.props;

    let beforeCount = 0;
    let afterCount = 0;

    if (size > 1) {
      beforeCount = Math.max(Math.floor(size / 2), 2)
      afterCount = Math.max(Math.ceil(size / 2), 2);
    }

    return (
      <CarouselWrapper>
        <EnhancedSwipeableViews
          index={this.state.index}
          onChangeIndex={this.onChangeIndex.bind(this)}
          style={rootStyle}
          slideStyle={slideStyle}
          overscanSlideBefore={beforeCount}
          overscanSlideAfter={afterCount}
          enableMouseEvents={true}
          slideRenderer={(params) => {
            return renderSlides(params.index, params.key, this.state.index)
          }}
        />
        {!!beforeCount &&
          <LeftButton onClick={() => this.updateIndex(-1, this.props.size)}/>
        }
        {!!afterCount &&
          <RightButton onClick={() => this.updateIndex(1, this.props.size)}/>
        }
      </CarouselWrapper>
    );
    return <div/>
  }
}
