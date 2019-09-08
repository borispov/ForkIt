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
  justify-content: space-between;
  max-width: auto;
  width: inherit;
  margin-left: 55px;
  margin-right: 55px;
`

const Instructions = styled.p`
  max-width: 420px;
  width: auto;
  line-height: 1.15;
  font-size: 14px;
  font-family: ${props => props.theme.card.font};
  color: ${props => props.theme.main};
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


// TODO: DRY!
const RecipeItemSection = ({ instructions, ingridients, isOpen, ID, author, email }) => {

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
    console.log('id: ', id)
    console.log('mail: ', mail)
    cookRecipe()
  }

  useEffect(() => {

  }, [errorState])
  return (
    isOpen &&
      <React.Fragment>
        <Mutation mutation={COOK_RECIPE} variables={{ _recID: ID, email: email }}>

        {(cookRecipe, {data}) => {

          return (

              <Wrapper>
                <FlexSection>
                  <Instructions>
                    <h3>הוראות הכנה: </h3>
                    {instructions.split('\n').map((step, idx) => <p key={idx}>{`${idx+1}) ${step}`}</p>)}
                  </Instructions>
                  <div>
                    <h3>מרכיבים</h3>
                    <ul>
                    {
                      ingridients.split('\n').map((ingr, idx) => <li key={idx}>{ingr}</li>)
                    }
                    </ul>
                  </div>
                </FlexSection>
                { errorState && <label>Already Cooked.</label> }
                <CookBtn onClick={() => handleCook(ID, 'OK', email, cookRecipe)}>לבשל עכשיו!</CookBtn>
              </Wrapper>
          )
        }
      }
      </Mutation>
    </React.Fragment>
  )
}

export default RecipeItemSection
