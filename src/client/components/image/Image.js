import React from 'react';
import styled from 'styled-components';

const placeHolder = 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  position: relative;
  flex-basis: 100%;
  // flex-basis: calc(33.333% - 20px);
  margin: 10px;
  // cursor: pointer;
  transition: 0.5s all ease-in;
`

const Img = styled.img`
  cursor: cursor;
  width: 100%;
  max-width: 620px;
  min-height: 400px;
  max-height: 400px;
`

export const Image = ({ image }) => (
  <ImageWrapper>
    <ImageContainer>
      <Img src={image || placeHolder} />
    </ImageContainer>
  </ImageWrapper>
)

// module.exports = Image
