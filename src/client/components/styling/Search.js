import React, { Fragment } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import remcalc from 'remcalc';

const SearchBar = styled.input`
  padding: ${props => props.asNav ? remcalc(6) : remcalc(30)};
  // avoid glitches when input is focused
  border: 1px solid rgba(0,0,0,0.0);
  border-bottom: 1px solid ${props => props.theme.main};
  margin-top: 1px;
  // width: ${remcalc(450)};
  width: ${props => props.asNav ? remcalc(200) : remcalc(450)};
  font-size: ${props => props.asNav ? remcalc(16) : remcalc(32)};
  outline: none;
  font-weight: 300;
  background: ${props => props.theme.secondary};
  display: block;
  &::placeholder {
    text-align: ${props => props.asNav ? 'left' : 'center' };
  }
  border-radius: ${remcalc(4)};
  &:focus {
    border: ${remcalc(1)} solid ${props => props.theme.main}66;
    background: ${props => props.theme.white};
  }
`
const Icon = styled(FontAwesomeIcon)`
  position: absolute;
`

const SearchIcon = styled(Icon)`
  right: 15%;
  top: 25%;
  max-width: ${remcalc(20)};
  // height: ${remcalc(20)};
  transition: all 0.2s ease;
`

const InputWrapper = styled.div`
  position: relative;
  max-width: ${props => props.asNav ? '240px' : '450px'};
  z-index: 1;
  display: flex;
  flex-direction: row;
  width: ${props => props.asNav ? '240px' : 'auto'};
  margin: ${props => props.asNav ? '0' : '12px auto'}
  justify-content: space-between;
`

export default (props) => (
  <InputWrapper {...props}>
    <SearchBar placeholder="Search" asNav={props.asNav || null} />
    <SearchIcon icon={faSearch} />
  </InputWrapper>
)
