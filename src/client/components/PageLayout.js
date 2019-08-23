import React from 'react';
import Header from './header/Header';
import Nav from './Nav';
import Footer from './footer/Footer';
import styled from 'styled-components';

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  padding-bottom: 140px;
`

export default ({ children, title, showSearch}) => (
  <PageWrapper>
    <Nav />
    <Header title={title ? title : 'Fork It, Fork Hub'} showSearch={showSearch}/>
    <ContentWrapper>
      {children}
    </ContentWrapper>
    <Footer />

  </PageWrapper>
)
