import React from "react"
import styled from 'styled-components'
import { responsive, breakpoints } from "../utils/style";
import Img from "gatsby-image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const HeroWrapper = styled.div`
  padding-bottom: 80px;
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  box-sizing: border-box;

  padding: 20px;
  ${responsive.sm`
    padding: 100px;
  `}
  ${responsive.md`
    padding: 200px;
  `}
  ${responsive.lg`
    padding: 300px;
  `}

`;

const HeroText = styled.div`
  width: 100%;
`;

const HeroMainText = styled(HeroText)`

`;

const HeroSubText = styled(HeroText)`
  display: ${p => p.showText ? "block" : "none"};
`;

// const HeroScroll = styled.div`
//   /* width: 500px; */
//   height: 50px;
//   position: relative;
// }`

const HeroImageWrapper = styled.div`
  position: relative;
  height: 100vh;
  border-bottom: black 1px solid;
`;

// const LeftSlide = styled.div`
//   padding-left: 100px;
//   padding-right: 100px;
//   text-align: left;
// `;
//
// const CurrentSlide = styled.div`
//   padding-left: 50px;
//   padding-right: 50px;
//   text-align: left;
//   transition: all 2s ease;
// `
//
// const RightSlide = styled.div`
//   padding-right: 100px;
//   padding-left: 100px;
//   text-align: left;
// `;

export default class Hero extends React.Component {
  constructor() {
    super()
    this.state = {
      subTextDisplayed: false
    }
  }

  toggleSubText() {
    console.log("toggleSubText");
    this.setState({
      subTextDisplayed: !this.state.subTextDisplayed
    });
  }

  renderText() {
    return <div/>
  }
  render() {
    let { mainText, subText, image } = this.props;
    return (
      <HeroWrapper>
        <HeroImageWrapper>
          <Img
            fluid={image.fluid}
            alt=""
            loading="eager"
            style={{ height: "100%" }}/>
          <HeroTextWrapper>
            <HeroMainText>
              {documentToReactComponents(mainText.json)}
            </HeroMainText>
          </HeroTextWrapper>
        </HeroImageWrapper>

      </HeroWrapper>
    );
  }
}


// <Carousel
//   elements={textArray.map(value => this.renderText(value))}
//   currentSlideStyle={{textAlign: "left"}}
//   leftSlideStyle={{
//     textAlign: "right",
//     paddingRight: "0px",
//     // marginRight: "-200px"
//   }}
//   rightSlideStyle={{
//     textAlign: "left",
//     paddingLeft: "0px",
//     // marginLeft: "-200px"
//   }}
//   renderSlides={(index, key, stateIndex) => {
//     return this.renderSlides(index, key, stateIndex, textArray);
//   }}
// />
