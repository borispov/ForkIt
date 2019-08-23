import React from 'react';
import styled, {css, keyframes} from 'styled-components';

export const FormGroup = styled.div`
  color: palevioletred;
  display: block;
  width: 350px;
  margin: 25px auto;
`;

export const Label = styled.label`
  margin-top: 0.4em;
  margin-bottom: 0.2em;
  color: ${props => props.theme.main};
  display: block;
  text-align: right;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const fadeInAnimation = css`
  animation: ${fadeIn} 0.3 ease-in;
`

export const Input = styled.input`
  padding: 0.25em 0.5em;
  color: ${props => props.theme.main};
  // background: ${props => props.bg ? props.bg : props.theme.ctatext};
  border: 1px solid ${props => props.theme.lightgray}88;
  border-radius: 6px;
  width: ${props => props.width ? props.width : 'auto'};
  outline: none;
  margin-bottom: 0.5em;
  margin-left: ${props => props.ml ? props.ml : '0'};
  margin-right: ${props => props.mr ? props.mr : '0'};
  font-size: 16px;
  animation: ${props => props.animate ? css`${fadeIn} 0.3s ease-in`: ''};
  &::placeholder {
    font-size: 12px;
    color: ${props => props.theme.lightgray};
    font-weight: 300;
    letter-spacing: 0.25px;
  }
`;

export const Message = styled.label`
	margin-bottom: 0.5em;
  color: palevioletred;
	display: block;
`;

export const Select = styled.select`
  display: block;
  padding: 1em;
  border-radius: 3px;
  font-style: italic;
  width: auto;
  // width: 19px;
  line-height: 1.4;
  margin-bottom: 1rem;
  outline: none;
  border: none;
  font-size: 16px;
  color: palevioletred;
  &::placeholder {
    color: gainsboro;
    font-size: 13px;
  }
`

export const TextArea = styled.textarea`
  max-width: auto;
  line-height: 24px;
  width: 280px;
  height: auto;
  min-height: 100px;
  color: black;
  border-radius: 6px;
  margin-bottom: 0.5em;
  font-size: 16px;
  font-weight: 300;
  border: 1px solid ${props => props.theme.lightgray}88;
  font-family: inherit;
  resize: none;
  transition: width 0.15s ease-in-out;
  overflow: auto;
  &::placeholder {
    color: ${props => props.theme.darkgray}C9;
    font-size: 16px;
  }
  &:focus {
    width: 350px;
  }

`
