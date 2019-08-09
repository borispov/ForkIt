import React, {useState} from 'react';
import styled from 'styled-components';
import RecipeItemSection from './RecipeItemSection';

const ListWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: column;
  // margin-top: 48px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  &:nth-child(odd){
    border-radius: 6px;
    background: ${props => props.theme.lightgray}22;
  }
`

const ListItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  // background: ${props => props.theme.lightgray};
  color: ${props => props.theme.main};
  font-weight: 400;
  font-family: 'Montserrat';
  height: 32px;
  width: 720px;
  padding: 6px 2px;
  @media (max-width: 768px) {
    width: auto;
    // max-width: 95%;
    height: auto;
    flex-flow: row wrap;
    // > * {
    //   flex: 1;
    // }
  }
`

const Title = styled.span`
  font-size 18px;
  font-weight: 700;
  padding: 6px 4px;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  flex-basis: 280px;
  @media (max-width: 768px){
    flex-basis: 140px;
  }
`

const Piece = styled.span`
  font-size: 14px;
  font-weight: 400;
  padding: 6px 4px;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  &:nth-child(3){
    flex-basis: 80px;
  }
  &:nth-child(4){
    margin-right: -35px;
    flex-basis: 70px;
  }
`

const mapToItems = (rec, key) => <RecipeItemSection key data={rec} />


const RecipeItem = ({ recipeData }) => {

  const [isOpen, trigger] = useState(false)

  const { instructions, ingridients, name, author, time, difficulty, lastCooked } = recipeData

  const openSection = () => {
    console.log('state before trigger: ', isOpen)
    trigger(!isOpen)
  }

  return (
      <ListWrapper onClick={openSection}>
        <ListItem>
          <Title>{name}</Title>
          <Piece>{author}</Piece>
          <Piece>{time.split('\n').join(' ')}</Piece>
          <Piece>{difficulty}</Piece>
          <Piece>{lastCooked}</Piece>
        </ListItem>
        <RecipeItemSection
          isOpen={isOpen}
          instructions={instructions}
          ingridients={ingridients}
        >
        </RecipeItemSection>
      </ListWrapper>
  )
}
export default RecipeItem
