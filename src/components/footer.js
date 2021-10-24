import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import AnimateHeight from "react-animate-height";

// Context
import LayoutContext, { Breakpoints } from "../context/layout";

// Hooks
import useScroll from "../hooks/scroll";

// Utils
import { responsive } from "../utils/style";
import renderRichText from "../utils/rich-text";

import arrow from "../images/ic_arrow.png";

const FooterDrawers = styled.div`
  position: ${p => (p.fixed ? "fixed" : "relative")};
  bottom: 0;
  left: 0;
  width: 100%;

  padding: env(safe-area-inset-right);
`;

const FooterWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  background-color: ${p => (p.scrolled || p.active ? "#f1f1f1" : "")};

  transition: background-color 0.5s ease;

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

const FooterIcon = styled.button`
  border: 0;
  padding: 0;
  appearance: none;
  background: none;
  margin: 0;

  ${responsive.sm`
    display: none
  `}

  display: flex;
  align-items: center;

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

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
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

export default function Footer(props) {
  const [contactActive, setContactActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [fixed, setFixed] = useState(true);

  const { scrolled, breakpoint } = useContext(LayoutContext);

  const { contactText, aboutText } = props;

  useScroll(handleScroll);

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
      <FooterWrapper active={active} scrolled={scrolled}>
        <FooterContact>
          <FooterHeader onClick={() => toggle("contact")}>
            <h2>Contact</h2>
            <FooterIcon>
              {contactActive ? (
                <StaticImage
                  src="../images/ic_minus.png"
                  placeholder="none"
                  alt="Collapse"
                />
              ) : (
                <StaticImage
                  src="../images/ic_plus.png"
                  placeholder="none"
                  alt="Expand"
                />
              )}
            </FooterIcon>
          </FooterHeader>
          <AnimateHeight height={contactActive ? "auto" : 0} duration={300}>
            <FooterContantInfo>
              {renderRichText(contactText.raw)}
            </FooterContantInfo>
          </AnimateHeight>
        </FooterContact>
        <FooterAbout>
          <FooterHeader onClick={() => toggle("about")}>
            <h2>About</h2>
            <FooterIcon>
              {aboutActive ? (
                <StaticImage
                  src="../images/ic_minus.png"
                  placeholder="none"
                  alt="Collapse"
                />
              ) : (
                <StaticImage
                  src="../images/ic_plus.png"
                  placeholder="none"
                  alt="Expand"
                />
              )}
            </FooterIcon>
          </FooterHeader>
          <AnimateHeight height={aboutActive ? "auto" : 0} duration={300}>
            <FooterInfo>{renderRichText(aboutText.raw)}</FooterInfo>
          </AnimateHeight>
        </FooterAbout>
      </FooterWrapper>
    </FooterDrawers>
  );
}
