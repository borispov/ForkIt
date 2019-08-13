import React, {useState, useEffect} from 'react';
import styled, {css, keyframes} from 'styled-components';
import Btn from '../styling/Btn';
import { Mutation } from 'react-apollo';
import { COOK_RECIPE } from '../../../queries';

const fadeIn = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  overflow: hidden;
  max-width: auto;
  width: inherit;
  background: ${props => props.theme.whiteoverlay};
  background: inherit;
  color: ${props => props.theme.offtext};
  animation:${css`${fadeIn} 0.5s ease-in-out;`};
  border-radius: 4px;
  // border-top: 1px solid ${props => props.theme.card.color};
  border-bottom: 1px solid ${props => props.theme.card.color};
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
  color: ${props => props.theme.main};
`

const Amount = styled.span`
  font-weight: 700;
  font-style: italic;
  color: #191919;
`
const Type = styled.span`
  font-weight: 400;
  color: #191919;
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


const RecipeItemSection = ({ instructions, ingridients, isOpen, ID, email }) => {

  const [errorState, setErrorState] = useState(false)

  const handleCook = (id, OK, mail, cookRecipe) => {
    console.log('executing cookRecipe')
    if (!id) {
      console.log('no id received.')
      return null
    }
    if (!OK) {
      setErrorState(true)
      return null
    }
    cookRecipe()
  }

  useEffect(() => {

  }, [errorState])
  return (
    isOpen &&
      <React.Fragment>
        <Mutation mutation={COOK_RECIPE} variables={{ _recID: ID, email }}>

        {(cookRecipe, {data}) => {

          return (

              <Wrapper>
                <FlexSection>
                  <Instructions>
                    {instructions}
                  </Instructions>
                  <div>
                    <ul>
                    {
                      ingridients.map(({type, amount}, idx) => <li key={idx}><Amount>{amount}</Amount>: <Type>{type}</Type></li>)
                    }
                    </ul>
                  </div>
                </FlexSection>
                { errorState && <label>Already Cooked.</label> }
                <CookBtn onClick={() => handleCook(ID, 'OK', email, cookRecipe)}>Cook Now!</CookBtn>
              </Wrapper>
          )
        }
      }
      </Mutation>
    </React.Fragment>
  )
}




export default RecipeItemSection
