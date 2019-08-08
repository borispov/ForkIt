import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const Input = styled.input`
  padding: ${remcalc(2)} ${remcalc(8)};
  height: ${remcalc(28)};
  color: ${props => props.theme.darkgray};
  background: ${props => props.theme.lightoverlay};
  font-size: ${remcalc(16)};
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.main};
`

export default Input
