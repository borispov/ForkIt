import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCube } from '@fortawesome/free-solid-svg-icons';
import { faStackExchange  } from '@fortawesome/free-brands-svg-icons';

const Wrapper = styled.div`
  margin-top: 62px;
  margin-left: auto;
  margin-right: auto;
`

const RecipeContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  line-height: 24px;
`

const Title = styled.h1`
  font-size: 22px;
  color: ${props => props.theme.main};
  line-height: 0.1em;
  border-bottom: 1px solid #a2b427;
  margin: 105px 0 30px;
  text-align: center;
`

const TitleSpan = styled.span`
  background: ${props => props.theme.lightoverlay};
  padding: 0 25px;
`

const IconsWrapper = styled.div`
  padding: 4px 8px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const IconDiv = styled.div`
  display: flex;
  margin: 6px 44px;
  flex-direction: column;
  padding: 0 12px;
  align-items: center;
`

const Icon = styled(FontAwesomeIcon)`
  position: relative;
  color: ${props => props.theme.card.color};
  font-size: 28px;
  margin: 6px;
`

const Label = styled.label`
  color: ${props => props.theme.main};
  font-size: 18px;
`

const ImgWrap = styled.figure`
  max-width: 620px;
  max-height: 460px;
  margin: 0 auto;
  width: 405px;
`

const Caption = styled.figcaption`
  background: ${props => props.theme.lightoverlay}AA;
  color: ${props => props.theme.offtest};
  font-size: 12px;
`

const Paragraph = styled.div`
  line-height: 24px;
  color: #19191999;
  font-size: 18px;
  margin: 0 auto;
  max-width: 600px;
`

const Instructions = styled(Paragraph)`
  margin-top: 42px;
`

const Ingridients = styled(Paragraph)`
  color: ${props => props.theme.card.darkgray};
  line-height: 22px;
  display: block;
  line-height: 1.65;
  font-size: 16px;
`

const TitleWithBorder = ({ children }) => (
  <Title>
    <TitleSpan>
      {children}
    </TitleSpan>
  </Title>
)

const parseInstructions = instr => {
  return /\r|\n/.test(instr) ?
    <ol>
      {
        instr
          .split(/\n/)
          .map((step, key) => <li key={key}>{step}</li>)
      }
    </ol>
  : `Unfortunately, Instructions weren't added according to rules, hence this might looks disorganized and scattered: 
    ${instr}`
}

export default ({data}) => (
  <RecipeContainer>
    <TitleWithBorder>
        {data.name}
    </TitleWithBorder>
    <IconsWrapper>
      <IconDiv>
        <Icon icon={faClock} />
        <Label>{data.time} דק׳</Label>
      </IconDiv>
      <IconDiv>
        <Icon icon={faCube} />
        <Label>{data.difficulty}</Label>
      </IconDiv>
    </IconsWrapper>
    <ImgWrap>
      <img src={data.image} width="420" height="420" alt="recipe img" />
      <Caption>{data.image.credit || `${data.name} Image By Unknown`}</Caption>
    </ImgWrap>
    <TitleWithBorder> מרכיבים </TitleWithBorder>
    <Ingridients>
      <ul>
       {
          data.ingridients
            .trim()
            .split('\n')
            .map((ingridient, i) =>
              <div key={i}>
                 <li style={{fontSize: '14px', fontWeight: '300'}}>{ingridient}</li>
              </div>
            )
        }
      </ul>
    </Ingridients>
    <TitleWithBorder> הוראות הכנה </TitleWithBorder>
    <Instructions>
      {
        parseInstructions(data.instructions)
      }
    </Instructions>
  </RecipeContainer>
)


