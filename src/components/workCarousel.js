import React from "react";
import styled from "styled-components";
import { breakpoints } from "../utils/style";
import { mod } from "react-swipeable-views-core";
import Img from "gatsby-image";

import Carousel from "./carousel";

const SlideWrapper = styled.div`
  width: 100%;
  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
  box-sizing: border-box;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  video {
    max-width: 100%;
    max-height: 100%;
  }
`;

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
    switch (breakpoint) {
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

  renderSlides(index, key, currentSlideIndex, entries, updateIndex) {
    const size = entries.length;
    const entryIndex = mod(index, size);
    return (
      <SlideWrapper
        onClick={() => this.handleImageClick(key, updateIndex)}
        key={key}
        size={size}
      >
        {this.renderSlide(entries[entryIndex])}
      </SlideWrapper>
    );
  }

  renderSlide(entry) {
    if (entry.image) {
      const image = entry.image;
      return (
        <Img fluid={image.fluid} alt={image.description} loading="eager" />
      );
    } else if (entry.video) {
      const file = entry.video.source.file;
      return (
        <VideoWrapper>
          <video autoPlay={true} loop={true} muted>
            <source src={file.url} type={file.contentType} />
          </video>
        </VideoWrapper>
      );
    }
  }

  handleImageClick(key, updateIndex) {
    if (key === -1) {
      updateIndex(-1);
    }
    if (key === 1) {
      updateIndex(1);
    }
  }

  render() {
    const rootStyle = this.getPadding(this.state.breakpoint);
    return (
      <Carousel
        rootStyle={rootStyle}
        renderSlides={(index, key, currentSlideIndex, updateIndex) => {
          return this.renderSlides(
            index,
            key,
            currentSlideIndex,
            this.props.entries,
            updateIndex
          );
        }}
        size={this.props.entries.length}
      />
    );
  }
}
