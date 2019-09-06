import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const Btn = styled.button`
  padding: 0 6px;
  border-radius: 2px;
  background: ${props => props.bg ? props.bg : props.theme.darkgray};
  color: ${props => props.color ? props.color : props.theme.cta};
  font-family: 'Prompt';
  outline: none;
  border: none;
  font-size: ${remcalc(14)};
  font-weight: 300;
  cursor: pointer;
  width: ${props => props.width ? props.width : ''};
  &:hover { 
    box-shadow: 0 2px 12px 4px rgba(0,0,0,0.1);
  }
`

export default Btn;
