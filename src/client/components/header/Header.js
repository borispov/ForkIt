import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import Search from '../styling/Search';

// TODO: Add Title underline animation - when page loads, animate opacity.
const Title = styled.h1`
  opacity: 0.8;
  font-family: ${props => props.theme.font || 'Space Mono', 'aria'};
  font-size: ${remcalc(42)};
  line-height: 1.15;
  text-transform: capitalize;
  color: ${props => props.theme.main};
  text-align: center;
  position: relative;
  width: auto;
  margin-bottom: 40px;

  @media (max-width: ${remcalc(768)}) {
    font-size: ${remcalc(32)};
    margin: auto;
    margin-bottom: ${remcalc(40)};
    position: relative;
  }

  span {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      height: ${remcalc(12)};
      width: ${remcalc(350)};
      width: 100%;
      left: 50%;
      bottom: 0;
      background: linear-gradient(to right, ${props => props.theme.cta} 0%, ${props => props.theme.darkgray});
      transform: translateX(-50%) rotate(-1deg);
      z-index: -1;
      opacity: 0.8;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: ${remcalc(88)};
  max-width: 1024px;
  height: 45px;

  @media (max-width: ${remcalc(768)}) {
    flex-direction: column;
    margin-bottom: ${remcalc(20)};
    height: auto;
`

export default ({title, showSearch}) => (
  <Wrapper>
    <br />
    <Title><span>{title}</span></Title>
    {/*  
    
    {showSearch && (
      <Search />
    )}
    */}
  </Wrapper>
)
