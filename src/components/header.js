import React from "react"
import styled from 'styled-components'
import { responsive } from "../utils/style"
import est from "../images/ic_est.png"

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 999;
`

const HeaderContainer = styled.header`

  max-height: 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  border-bottom: 1px solid black;

  background-color: ${p => p.scrolled ? "#f1f1f1" : ""};

  ${p => p.scrolled ? "cursor: pointer" : ""};

  transition: all 0.5s ease;

  height: ${p => p.scrolled ? "64px" : "80px"};
  padding: 0 20px;

  ${responsive.sm`
    height: ${p => p.scrolled ? "80px" : "108px"};
    padding: 0 45px;
  `};
`;

const PopulationContainer = styled.div`
  display: flex;
  align-items: center;

  h2 {
    white-space: nowrap;
  }
  img {
    padding-right: 6px;
    height: 25px;

    display: block;

    ${responsive.sm`
      padding-right: 10px;
      display: block;
      height: 36px;
    `};
  }
`;

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      scrolled: false
    };
    this.scrollFn = this.handleScroll.bind(this);
  }

  handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  handleScroll() {
    this.setState({
      scrolled: window.scrollY >= 56
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFn);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  render() {
    return (
      <HeaderWrapper onClick={() => this.handleClick()}>
        <HeaderContainer scrolled={this.state.scrolled}>
          <h1>Lian</h1>
          <PopulationContainer>
            <img src={est} alt="EST"/>
            <h2>1992 Pop. 1</h2>
          </PopulationContainer>
          <h1>Land</h1>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }
}
