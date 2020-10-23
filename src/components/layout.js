import React from "react"
import styled from 'styled-components'

import './layout.scss';

import Header from "./header"
import Footer from "./footer"
import Credits from "./credits";
import SEO from "./seo";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export default class Layout extends React.Component {
  render() {
    const footer = this.props.data.allContentfulFooter.edges[0].node;
    const credits = this.props.data.allContentfulCredits.edges[0].node;

    return (
      <LayoutWrapper>
        <SEO />
        <Header/>
          {this.props.children}
        <Footer
          contactText={footer.contactText}
          aboutText={footer.aboutText}
        />
        <Credits
          image={credits.image}
          text={credits.text}
        />
      </LayoutWrapper>
    )
  }
}
