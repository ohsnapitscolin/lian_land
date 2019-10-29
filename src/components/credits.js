import React from "react"
import styled from 'styled-components'
import Img from "gatsby-image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import $ from "jquery";

const CreditsWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  padding-left: 20px;
  padding-right: 20px;
  background-color: white;

  h1 {
    padding-top: 30px;
  }

  box-sizing: border-box;
  border-top: solid 1px black;

  height: 200px;
`

const CreditsImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const CreditsCTA = styled.div`
  z-index: 1;
  cursor: pointer;
`;

const CreditsText = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
  z-index: 1;
`;

export default class Credits extends React.Component {
  handleClick() {
    $("html").animate({ scrollTop: "0px" });
  }

  render() {
    let { image, text } = this.props;
    return (
      <CreditsWrapper>
        <CreditsImageWrapper>
        <Img
          fluid={image.fluid}
          alt=""
          loading="eager"
          style={{ width: "100%" }}/>
        </CreditsImageWrapper>
        <CreditsCTA onClick={this.handleClick.bind(this)}>
          <h1>Entrance</h1>
        </CreditsCTA>
        <CreditsText>
          {documentToReactComponents(text.json)}
        </CreditsText>
      </CreditsWrapper>
    );
  }
}
