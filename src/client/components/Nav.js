import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import remcalc from 'remcalc';
import AddRecipeBtn from './AddRecipeBtn';
import { navLinks } from '../../utils/config';
import Search from './styling/Search';

import PropTypes from 'prop-types';

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1090px;
  padding: ${remcalc(62)} 12px;
  margin: 0 auto 0;
  background: ${props => props.theme.lightoverlay};
  @media (max-width: 768px) {
    flex-direction: column;
  }
  align-items: center;
  width: auto;
`

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: ${remcalc(768)}) {
    justify-content: center;
    flex-wrap: wrap;
    line-height: ${remcalc(40)};
  }
`

// the items in the ul
const Item = styled.li`
  // padding-top: ${remcalc(6)};
  margin-right: ${remcalc(25)};
  border: none;
  text-decoration: none;
  @media (max-width: ${remcalc(768)}) {
      font-size: ${remcalc(18)};
   }
  &:not(:last-child) {
      margin-right: ${remcalc(8)};
  }
`



// TODO: Add Logo Wrapper as well. Future.
const Logo = styled(Link)`
  border: none;
  text-align: center;
  text-decoration: none;
`


// specifically it is the Add Recipe Button
const StyledLink = styled(Link)`
  position: relative;
  border-bottom: ${props => props.noline ? 'none' : `0.125rem solid ${props.theme.main}`};
  line-height: ${remcalc(18)};
  letter-spacing: ${remcalc(0.15)};
  text-decoration: none;
  font-size: ${remcalc(16)};
  padding: ${remcalc(6, 12)};
  text-align: center;
  font-weight: ${props => props.bold ? 'bold' : 300};
  font-family: 'Prompt';
  color: ${props => props.theme.navhover};
  transition: all 0.2s ease;
  &:hover {
    color: ${props => props.theme.navtext};
    // background: ${props => props.theme.navhover};
  }
`

const MySpan = styled.span`
`

const mapLinksToList = (link, key) => (
  <Item key>
    {/* TODO :: Use different key instead of index value */}
    <StyledLink to={link.address}>
      <MySpan>{link.title}</MySpan>
    </StyledLink>
  </Item>
)

export default () => (
  <Wrapper>
    <React.Fragment>
      <Logo to="/home">
        <h1>ForkIt!</h1>
      </Logo>
      <Search asNav='asNav' />
    </React.Fragment>
    <List>
      {
        navLinks.map(mapLinksToList)
      }
      <AddRecipeBtn />
      <div>
        <StyledLink noline='true' bold='true' to="/Login">
          <MySpan>Login</MySpan>
        </StyledLink>
        <StyledLink noline='true' bold='true' to="/Register">
          <MySpan>Registration</MySpan>
        </StyledLink>
      </div>
    </List>
  </Wrapper>

)
