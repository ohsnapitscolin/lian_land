import React, { useState, useContext } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import AnimateHeight from "react-animate-height";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

// Hooks
import useScroll from "../hooks/scroll";

// Utils
import { responsive } from "../utils/style";
import renderRichText from "../utils/rich-text";

const FooterDrawers = styled.div`
  position: ${(p) => (p.fixed ? "fixed" : "relative")};
  bottom: 0;
  left: 0;
  width: 100%;

  background-color: #f1f1f1;
  padding-bottom: ${(p) => (p.fixed ? "env(safe-area-inset-bottom)" : "0")};
`;

const FooterWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  &.scrolled {
    top: unset;
    transform: translateY(-100%);
  }

  background-color: #f1f1f1;
  transition: transform 0.5s;

  ${responsive.sm`
    flex-direction: row;
  `}
`;

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
`;

const FooterContact = styled.div`
  min-width: 350px;

  display: flex;
  flex-direction: column;

  h2 {
    line-height: 1.5;
  }
`;

const FooterInfo = styled.div`
  padding: 10px 20px 30px;

  ${responsive.sm`
    padding: 27px 50px 50px;  
  `}
`;

const FooterAbout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const FooterAboutInfo = styled(FooterInfo)`
  padding-bottom: 40px;

  ${responsive.sm`
    padding-bottom: 50px;
  `}

  p {
    margin-bottom: 15px;

    ${responsive.sm`
      margin-bottom: 0;
    `}
  }
`;

const FooterContactInfo = styled(FooterInfo)`
  h2 {
    padding-right: 60px;
  }

  ul {
    padding-left: 0;
    list-style: none;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  li {
    position: relative;

    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: "→";
    }

    margin-bottom: 15px;
    padding-left: 17px;

    ${responsive.sm`
      padding-left: 32px;
    `}

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;
  }

  ${responsive.sm`
    display: block;
  `}
`;

export default function Footer(props) {
  const [contactActive, setContactActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [fixed, setFixed] = useState(true);

  const { scrolled, breakpoint } = useContext(LayoutContext);

  const { contactText, aboutText } = props;

  useScroll(throttle(handleScroll, 100));

  function handleScroll() {
    const distanceToBottom =
      document.body.scrollHeight - (window.scrollY + window.innerHeight);
    setFixed(distanceToBottom > 250);
  }

  function toggle(trigger) {
    if (breakpoint !== Breakpoints.XS) {
      if (contactActive !== aboutActive) {
        setContactActive(true);
        setAboutActive(true);
        return;
      }

      setContactActive(!contactActive);
      setAboutActive(!aboutActive);
      return;
    }

    if (trigger === "contact") {
      setContactActive(!contactActive);
    }

    if (trigger === "about") {
      setAboutActive(!aboutActive);
    }
  }

  const active = aboutActive || contactActive;

  return (
    <FooterDrawers fixed={fixed}>
      <FooterWrapper
        className={scrolled ? "scrolled" : ""}
        active={active}
        scrolled={scrolled}
      >
        <FooterContact>
          <FooterHeader onClick={() => toggle("contact")}>
            <h2 className="text">Contact</h2>
            <span className="text">{contactActive ? "—" : "+"}</span>
          </FooterHeader>
          <AnimateHeight height={contactActive ? "auto" : 0} duration={300}>
            <FooterContactInfo className="text-m">
              {renderRichText(contactText.raw)}
            </FooterContactInfo>
          </AnimateHeight>
        </FooterContact>
        <FooterAbout>
          <FooterHeader onClick={() => toggle("about")}>
            <h2 className="text">About</h2>
            <span className="text">{aboutActive ? "—" : "+"}</span>
          </FooterHeader>
          <AnimateHeight height={aboutActive ? "auto" : 0} duration={300}>
            <FooterAboutInfo className="text-m">
              {renderRichText(aboutText.raw)}
            </FooterAboutInfo>
          </AnimateHeight>
        </FooterAbout>
      </FooterWrapper>
    </FooterDrawers>
  );
}
