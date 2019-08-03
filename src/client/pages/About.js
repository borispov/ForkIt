import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import PageLayout from '../components/PageLayout';

const imageURL = `https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80`

const splitPara = text => text.split('\n').map(l=>!l.length?<><br/></>:<span>{l}</span>)

const Wrap = styled.div`
  height: auto;
  max-width: 920px;
  display: block;
  margin: ${remcalc(64)} auto ${remcalc(32)};
`

const Title = styled.h1`
  text-align: center;
  font-family: ${props => props.theme.font};
  font-size: ${remcalc(18)};
`

const Para = styled.p`
  line-height: 1.5;
  font-family: arial, sans-serif;
  font-size: ${remcalc(18)};
  padding-left: ${remcalc(12)};
  color: ${props => props.theme.darkgray};
  @media (min-width: 768px) {
    max-width: ${remcalc(420)};
  }
`

const ImageWrapper = styled.div`
  // width: ${remcalc(600)};
  width: auto;
  height: ${remcalc(450)};
  display: block;
  border-radius: 6px;
  position: relative;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
`

const Image = styled.img`
  display: block;
  opacity: 0.8;
  // width: ${remcalc(600)};
  width: 100%;
  height: ${remcalc(450)};
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const myContact = [
  {media: 'email', address: 'boristofu@gmail.com'},
  {media: 'website', address: 'www.borispov.com'},
  {media: 'Facebook', address: 'facebook.com/povolotsky'}
]

const SpanCap = styled.span`
  text-transform: capitalize;
  font-family: Space Mono;
`

const Anchor = styled.a`
  text-decoration: none;
  color: {$props => props.theme.cta};
`

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
`

const Contact = () => (
  <ContactSection>
    <h2>Contact Me: </h2>
    {
      myContact.map(e=><h3><SpanCap>{e.media}: </SpanCap><Anchor href={e.address}>{e.address}</Anchor></h3>)
    }
  </ContactSection>
)

const rawParagraph = `Fork Hub, Essentially dedicated for my wife who needed a place to store her recipes.
A basic paper notebook would definitely suffice. However, with some inspiration from fellow developers I decided to add simple but important features and bring this to life.\n
As part of the process, we decided to implement a social aspect with fun fundamentals of being able to share recipes with others, comment, get inspired etc.\n
Feel free to contact me for contribution, questions or just stop by to say hello!`


const aboutSectionParagraph = splitPara(rawParagraph)

export default (props) => (
  <PageLayout showSearch={false}>
    <Wrap>
      <ImageWrapper>
        <Image src={imageURL} alt="Kitchen Placeholder" />
      </ImageWrapper>
      <Flex>
        <Para>
          {aboutSectionParagraph}
        </Para>
        <Contact />
      </Flex>
    </Wrap>
  </PageLayout>
)
