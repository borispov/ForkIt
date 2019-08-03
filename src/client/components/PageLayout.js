import React from 'react';
import Header from './header/Header';
import Nav from './Nav';
import Footer from './footer/Footer';

export default ({ children, title, showSearch}) => (
  <>
    <Nav />
    <Header title={title ? title : 'Fork It, Fork Hub'} showSearch={showSearch}/>
      {children}
    <Footer />
  </>
)
