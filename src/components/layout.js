import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import $ from "jquery";

import './layout.scss';

import Header from "./header"
import Footer from "./footer"
import Credits from "./credits";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const LayoutPadding = styled.div`
  /* padding-bottom: 80px; */
`

export default class Layout extends React.Component {
  render() {
    const footer = this.props.data.allContentfulFooter.edges[0].node;
    const credits = this.props.data.allContentfulCredits.edges[0].node;

    return (
      <LayoutWrapper>
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
