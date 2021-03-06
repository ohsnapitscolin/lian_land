import React from "react";
import styled from "styled-components";
import { breakpoints } from "../utils/style";
import { mod } from "react-swipeable-views-core";
import Img from "gatsby-image";

import Carousel from "./carousel";

const SlideWrapper = styled.div`
  width: 100%;
  height: ${p => (p.slideWidth ? p.slideWidth * 0.625 : 300)}px;

  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
  box-sizing: border-box;

  overflow: hidden;
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

export default class WorkCarousel extends React.Component {
  constructor() {
    super();

    this.state = {
      breakpoint: null,
      slideWidth: 0
    };

    this.slideWrapper = React.createRef();
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.updateBreakpoint().then(() => {
      this.setState({
        slideWidth: this.slideWrapper.current.clientWidth
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    this.updateBreakpoint().then(() => {
      this.setState({
        slideWidth: this.slideWrapper.current.clientWidth
      });
    });
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
    return new Promise(resolve => {
      this.setState(
        {
          breakpoint: breakpoint
        },
        resolve
      );
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

  renderSlides(index, key, entries) {
    const { slideWidth } = this.state;
    const size = entries.length;
    const entryIndex = mod(index, size);

    return (
      <SlideWrapper
        key={key}
        ref={this.slideWrapper}
        slideWidth={slideWidth}
        size={size}
      >
        {this.renderSlide(entries[entryIndex])}
      </SlideWrapper>
    );
  }

  renderSlide(entry) {
    // Render Image Entry
    if (entry.image) {
      const image = entry.image;
      return (
        <Img
          fluid={image.fluid}
          alt={image.description}
          loading="lazy"
          aspectRatio={1.0}
        />
      );
    }
    // Render Video Entry
    else if (entry.video) {
      const file = entry.video.source.file;
      return (
        <VideoWrapper>
          <Video loop={true} muted autoPlay playsInline>
            <source src={file.url} type={file.contentType} />
          </Video>
        </VideoWrapper>
      );
    }
  }

  render() {
    const rootStyle = this.getPadding(this.state.breakpoint);
    return (
      <Carousel
        rootStyle={rootStyle}
        renderSlides={(index, key) => {
          return this.renderSlides(index, key, this.props.entries);
        }}
        size={this.props.entries.length}
      />
    );
  }
}
