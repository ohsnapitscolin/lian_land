import React from "react"
import styled from 'styled-components'
import { responsive, breakpoints } from "../utils/style";
import Img from "gatsby-image";
import renderRichText from '../utils/rich-text';
import arrow from "../images/ic_arrow.png";

const CreditsWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border-top: solid 1px black;

  height: 270px;
  ${responsive.sm`
    height: 200px;
  `}
`;

const CreditsContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-left: 20px;
  padding-right: 20px;

  ${responsive.sm`
    flex-direction: row;
    align-items: center;
    padding-left: 45px;
    padding-right: 45px;
  `}
`

const CreditsImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const CreditsCTA = styled.div`
  display: flex;
  align-items: center;

  z-index: 1;
  cursor: pointer;

  padding-top: 34px;

  ${responsive.sm`
    padding-top: 0;
  `}

  img {
    height: 20px;
    padding-top: 15px;

    ${responsive.sm`
      height: 30px;
    `}
    transform: rotate(270deg);
  }
`;

const CreditsText = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
  z-index: 1;

  max-width: 450px;

  ${responsive.sm`
    text-align: right;
  `}
`;

export default class Credits extends React.Component {
  handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    let { image, text } = this.props;
    return (
      <CreditsWrapper>
        <CreditsContentWrapper>
          <CreditsImageWrapper>
          <Img
            fluid={image.fluid}
            alt=""
            loading="eager"
            style={{
              width: "100%",
              height: "100%"
            }}/>
          </CreditsImageWrapper>
          <CreditsCTA onClick={this.handleClick.bind(this)}>
            <h1>Entrance</h1>
            <img src={arrow}/>
          </CreditsCTA>
          <CreditsText>
            {renderRichText(text.json)}
          </CreditsText>
        </CreditsContentWrapper>
      </CreditsWrapper>
    );
  }
}
