import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const Btn = styled.button`
  padding: ${remcalc(6)} ${remcalc(8)};
  border-radius: 2px;
  background: ${props => props.theme.darkgray};
  color: ${props => props.theme.cta};
  font-family: 'Prompt';
  outline: none;
  border: none;
  font-size: ${remcalc(14)};
  font-weight: 300;
  cursor: pointer;
  &:hover { 
    box-shadow: 0 2px 12px 4px rgba(0,0,0,0.1);
  }
  margin: 0 6px;
`

const BtnTxt = 'הוסף מתכון';

export default () => (
  <Btn>
    {BtnTxt}
  </Btn>
)
