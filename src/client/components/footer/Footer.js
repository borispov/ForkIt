import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.div`
  width: 100vw;
  background: ${props => props.theme.darkgray};
  color: ${props => props.theme.white};
  font-family: 'Prompt';
  position: absolute;
  bottom: 0;
  // margin-top: 120px;
  // bottom: 0;
  height: 64px;
  padding-top: 8px;
  align-items: center;
  text-align: center;
`

const CopyMsg =  styled.h1`
  font-size: 16px;
  color: inherit;
  letter-spacing: 0.05px;
`

const P = styled.p`
  font-family: serif;
  font-size: 12px;
`

export default () => (
  <FooterWrap>
    <P>All Rights Reserved To Boris Povolotsky ™ @ <a style={{ color: 'inherit'}}href="www.borispov.com">www.borispov.com </a></P>
  </FooterWrap>
)
