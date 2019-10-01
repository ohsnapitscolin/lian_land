import React from "react"
import styled from "styled-components"
import { responsive, breakpoints } from "../utils/style";
import { mod } from 'react-swipeable-views-core'
import Img from "gatsby-image"

import Carousel from "./carousel";

const ImageWrapper = styled(Img)`
  width: 100%;
  border: black solid 1px;
`;

const rootStyle = {
  paddingLeft: "200px",
  paddingRight: "200px"
};

export default class WorkCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      breakpoint: null
    };
  }

  componentDidMount() {
    this.updateBreakpoint();
    window.addEventListener("resize", this.handleWindowResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize.bind(this));
  }

  handleWindowResize() {
    this.updateBreakpoint();
  }

  updateBreakpoint() {
    let breakpoint = breakpoints.lg;
    if (window.innerWidth < breakpoints.sm) {
      breakpoint = 0;
    } else if (window.innerWidth < breakpoints.md) {
      breakpoint = breakpoints.sm;
    } else if (window.innerWidth < breakpoints.lg) {
      breakpoint = breakpoints.md;
    }
    this.setState({
      breakpoint: breakpoint
    });
  }

  getPadding(breakpoint) {
    switch(breakpoint) {
      case breakpoints.sm:
        return {
          paddingLeft: "100px",
          paddingRight: "100px"
        };
      case breakpoints.md:
        return {
          paddingLeft: "150px",
          paddingRight: "150px"
        };
      case breakpoints.lg:
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

  renderSlides(index, key, currentSlideIndex, images) {
    const imageIndex = mod(index, images.length);
    return this.renderSlide(images[imageIndex], key);
  }

  renderSlide(image, key) {
    return (
      <ImageWrapper
        key={key}
        fluid={image.fluid}
        alt=""
        loading="eager"
      />
    );
  }

  render() {
    const rootStyle = this.getPadding(this.state.breakpoint);
    return (
      <Carousel
        rootStyle={rootStyle}
        renderSlides={(index, key, currentSlideIndex) => {
          return this.renderSlides(
            index, key, currentSlideIndex, this.props.images);
        }}
        size={this.props.images.length}
      />
    );
  }
}
