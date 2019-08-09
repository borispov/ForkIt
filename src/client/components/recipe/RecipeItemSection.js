import React, {useState, useEffect} from 'react';
import styled, {css, keyframes} from 'styled-components';
import Btn from '../styling/Btn';

const fadeIn = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  max-width: auto;
  width: inherit;
  background: ${props => props.theme.darkgray};
  color: ${props => props.theme.offtext};
  animation:${css`${fadeIn} 0.5s ease-in-out;`};
`

const FlexSection =styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  max-width: auto;
  width: inherit;
`

const Instructions = styled.p`
  max-width: 420px;
  width: auto;
  line-height: 1.4;
  font-size: 14px;
  font-family: ${props => props.theme.card.font};
  color: ${props => props.theme.cta};
`

const Amount = styled.span`
  font-weight: 700;
  font-style: italic;
  color: ${props => props.theme.cta}66;
`
const Type = styled.span`
  font-weight: 400;
  color: ${props => props.theme.cta};
`

const CookBtn = styled(Btn)`
  background: ${props => props.theme.cta};
  color: ${props => props.theme.darkgray};
  width: 100px;
  display: block;
  margin: 16px auto 12px;
  border-radius: 4px;
  box-shadow: 0 1px 6px 4px rgba(60,20,40,0.1);
  &:hover {
    box-shadow: 0 3px 8px 6px rgba(60,20,40,0.4);
  }
`

const RecipeItemSection = ({ instructions, ingridients, isOpen }) => (
  isOpen &&
    <React.Fragment>
      <Wrapper>
        <FlexSection>
          <Instructions>
            {instructions}
          </Instructions>
          <div>
            <ul>
            {
              ingridients.map(({type, amount}, i) => <li key={i}><Amount>{amount}</Amount>: <Type>{type}</Type></li>)
            }
            </ul>
          </div>
        </FlexSection>
        <CookBtn>Cook Now!</CookBtn>
      </Wrapper>
      </React.Fragment>
)




export default RecipeItemSection