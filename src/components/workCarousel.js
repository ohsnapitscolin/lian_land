import React from "react";
import styled from "styled-components";
import { breakpoints } from "../utils/style";
import { mod } from "react-swipeable-views-core";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Carousel from "./carousel";

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;

  border: black solid 1px;
  border-top: 0px;
  border-left: solid ${p => (p.size > 1 ? "0px" : "1px")};
  box-sizing: border-box;
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

    this.slideWrapper = React.createRef();
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.updateBreakpoint();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
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

  renderSlide(index, key, entries) {
    const { identifier } = this.props;
    const size = entries.length;
    const entryIndex = mod(index, size);
    const entry = entries[entryIndex];

    let Slide;

    // Render Image Entry
    if (entry.image) {
      const image = entry.image;
      Slide = (
        <GatsbyImage
          image={getImage(image) || ""}
          alt={image.description}
          loading="lazy"
        />
      );
    }
    // Render Video Entry
    else if (entry.video) {
      const play = index === 0;
      const file = entry.video.source.file;
      Slide = (
        <VideoWrapper>
          <Video loop={true} muted autoPlay={play} playsInline={play}>
            <source src={file.url} type={file.contentType} />
          </Video>
        </VideoWrapper>
      );
    }

    return (
      <SlideWrapper
        key={`${identifier}_${key}`}
        ref={this.slideWrapper}
        size={size}
      >
        {Slide}
      </SlideWrapper>
    );
  }

  render() {
    const rootStyle = this.getPadding(this.state.breakpoint);
    return (
      <Carousel
        rootStyle={rootStyle}
        renderSlides={(index, key) => {
          return this.renderSlide(index, key, this.props.entries);
        }}
        size={this.props.entries.length}
      />
    );
  }
}
