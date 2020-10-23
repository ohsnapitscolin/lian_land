import React from "react"
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'
import { responsive, breakpoints } from "../utils/style"
import $ from 'jquery'
import renderRichText from '../utils/rich-text';
import arrow from "../images/ic_arrow.png";
import minus from "../images/ic_minus.png";
import plus from "../images/ic_plus.png";

const FooterDrawers = styled.div`
  position: ${p => p.fixed  ? "fixed" : "relative"};
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  background-color: ${p => p.scrolled || p.active ? "#f1f1f1" : ""};

  transition: background-color 0.5s ease;

  ${responsive.sm`
    flex-direction: row;
  `}
`

const FooterHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;

  cursor: pointer;

  ${responsive.sm`
    padding-left: 45px;
    height: 60px;
  `}


  margin-bottom: -1px;
  margin-right: -1px;

  border-top: black solid 1px;

  ${responsive.sm`
    border-right: black solid 1px;
    border-bottom: black solid 1px;
  `}

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FooterContact = styled.div`

  min-width: 350px;

  display: flex;
  flex-direction: column;

  h2 {
    line-height: 1.5;
  }
`;

const FooterInfo = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;

  ${responsive.sm`
    padding-left: 45px;
    padding-right: 55px;
    padding-top: 30px;
    padding-bottom: 40px;
  `}
`;

const FooterAbout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const FooterIcon = styled.h1`
  margin: 0;
  ${responsive.sm`
    display: none
  `}
  img {
    width: 15px;
  }
`;

const FooterContantInfo = styled(FooterInfo)`
  h2 {
    padding-right: 60px;
  }

  ul {
    padding-left: 0;
    list-style: none;
  }

  li {
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position: left center;

    margin-bottom: 8px;
    ${responsive.sm`
      margin-bottom: 0
    `};

    padding-left: 30px;
    background-size: 20px;

    ${responsive.sm`
      background-size: 30px;
      padding-left: 45px;
    `}
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  ${responsive.sm`
    display: block;
  `}
`;

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      contactActive: false,
      aboutActive: false,
      scrolled: false,
      fixed: true,
    }
    this.scrollFn = this.handleScroll.bind(this);
  }

  handleScroll() {
    const distanceToBottom =
      $(document).height() - ($(window).scrollTop() + $(window).height());

    this.setState({
      scrolled: window.scrollY >= 56,
      fixed: distanceToBottom > 250
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFn);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  toggle(trigger) {
    if (window.innerWidth > breakpoints.sm) {
      if (this.state.contactActive !== this.state.aboutActive) {
        this.setState({
          contactActive: true,
          aboutActive:true
        });
        return;
      }
      this.setState({
        contactActive: !this.state.contactActive,
        aboutActive: !this.state.aboutActive
      });
      return;
    }

    if (trigger === "contact") {
      this.setState({
        contactActive: !this.state.contactActive,
      });
    }

    if (trigger === "about") {
      this.setState({
        aboutActive: !this.state.aboutActive,
      });
    }
  }

  render() {
    let { contactText, aboutText } = this.props;
    const active = this.state.aboutActive || this.state.contactActive;
    return (
      <FooterDrawers
        fixed={this.state.fixed}
      >
        <FooterWrapper
          active={active}
          scrolled={this.state.scrolled}
        >
          <FooterContact>
            <FooterHeader onClick={() => this.toggle("contact")}>
              <h2>Contact</h2>
              <FooterIcon>{
                this.state.contactActive ?
                  <img src={minus} alt="-"/> :
                  <img src={plus} alt="+"/>
                }
              </FooterIcon>
            </FooterHeader>
            <AnimateHeight
              height={this.state.contactActive ? "auto" : 0}
              duration={300}
            >
              <FooterContantInfo>
                {renderRichText(contactText.json)}
              </FooterContantInfo>
            </AnimateHeight>
          </FooterContact>
          <FooterAbout>
            <FooterHeader onClick={() => this.toggle("about")}>
              <h2>About</h2>
              <FooterIcon>{
                this.state.aboutActive ?
                  <img src={minus} alt="-"/> :
                  <img src={plus} alt="+"/>
                }
              </FooterIcon>
            </FooterHeader>
            <AnimateHeight
              height={this.state.aboutActive ? "auto" : 0}
              duration={300}
            >
              <FooterInfo>
                {renderRichText(aboutText.json)}
              </FooterInfo>
            </AnimateHeight>
          </FooterAbout>
        </FooterWrapper>
      </FooterDrawers>
    );
  }
}
