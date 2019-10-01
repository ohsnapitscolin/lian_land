import React from 'react';
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const LeftButton = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
`;

const RightButton = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
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
  //
  // renderSlides(index, key, elements, currentSlideStyle, leftSlideStyle, rightSlideStyle) {
  //   let style = {};
  //   const moddedIndex = mod(index, elements.length);
  //   if (index === this.state.index) {
  //     style = currentSlideStyle
  //   } else if (index < this.state.index) {
  //     style = leftSlideStyle
  //   } else if (index > this.state.index) {
  //     style = rightSlideStyle
  //   }
  //   // debugger;
  //   console.log(style);
  //   return React.cloneElement(elements[moddedIndex], {
  //     key: key,
  //     style: style
  //   });
  // }

  render() {
    let {
      elements,
      style,
      rootStyle,
      slideStyle,
      // currentSlideStyle,
      // leftSlideStyle,
      // rightSlideStyle,
      renderSlides
    } = this.props;

    return (
      <CarouselWrapper>
        <EnhancedSwipeableViews
          index={this.state.index}
          onChangeIndex={this.onChangeIndex.bind(this)}
          style={rootStyle}
          slideStyle={slideStyle}
          overscanSlideAfter={2}
          overscanSlideBefore={2}
          enableMouseEvents={true}
          slideRenderer={(params) => {
            return renderSlides(params.index, params.key, this.state.index)
          }}
        />
        <LeftButton>
          <button onClick={() => this.updateIndex(-1, this.props.size)}>
            Left
          </button>
        </LeftButton>
        <RightButton>
          <button onClick={() => this.updateIndex(1, this.props.size)}>
            Right
          </button>
        </RightButton>
      </CarouselWrapper>
    );
    return <div/>
  }
}
