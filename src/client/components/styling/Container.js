import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

const Container = styled.div`

  margin-left: auto;
  margin-right: auto;
  max-width: 90%;

  @media (min-width: 1200px){
    max-width: 1140px;
  }

  @media (min-width: 768px){
    max-width: 620px;
  }

  @media (min-width: 992px){
    max-width: 768px;
  }
`

export default Container
