import React from "react"
import styled from 'styled-components'
import { responsive, breakpoints } from "../utils/style"
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

  transition: background-color 0.5s ease;

  height: ${p => p.scrolled ? "64px" : "80px"};
  padding: 12px 20px 18px 20px;

  ${responsive.sm`
    height: ${p => p.scrolled ? "96px" : "108px"};
    padding: 20px 45px 24px 45px;
  `};
`;

const PopulationContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    padding-right: 10px;
    height: 36px;

    display: none;

    ${responsive.sm`
      display: block;
    `};
  }
`;

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      scrolled: false
    };
  }

  handleScroll() {
    this.setState({
      scrolled: window.scrollY >= 56
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  render() {
    return (
      <HeaderWrapper>
        <HeaderContainer scrolled={this.state.scrolled}>
          <h1>Lian</h1>
          <PopulationContainer>
            <img src={est}/>
            <h2>2019 Pop. 1</h2>
          </PopulationContainer>
          <h1>Land</h1>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }
}
