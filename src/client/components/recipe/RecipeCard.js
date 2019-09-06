import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import RecipeView from '../../pages/RecipeView';
import Btn from '../styling/Btn';
import { Mutation } from 'react-apollo';
import { ADD_TO_KITCHEN } from '../../../queries';
import { useMutation } from '@apollo/react-hooks';

const {CardWrapper,
  CardHeading,
  CardHeadingSub,
  CardBody,
  CardHeader,
  CardParagraph,
  CardIcons,
  CardAuthor
} = require('./RecipeCardStyles');
const { Image } = require('../image/Image');

// TODO: Add Success Event -- when user adds recipe to kitchen, add some event to show user it's done.

const RecipeCard = ({ recipeData, history, email }) => {

  const [ addRecipeToUser ] = useMutation(ADD_TO_KITCHEN)

  const { image, name, instructions, time, difficulty, ingridients, description, author, _id } = recipeData;
  const recipes = {
    time, difficulty, ingridients, instructions
  }

  const cutText = txt => txt.substr(0, 93) + '...'
  const showDescription = txt => txt.length > 93 ? cutText : txt

  const addBtn = (e) => {
    e.preventDefault();
    if (!email) {
      history.push('/Login')
      return null
    }
    console.log('logged, adding:: ')
    addRecipeToUser({variables: { _recID: _id, email: email }})
  }

  return (
    <CardWrapper>
      <CardHeader onClick={() => history.push(`/recipe/${recipeData._id}`)} >
        <CardHeading>{name || ''}</CardHeading>
          <CardAuthor>By: {author}</CardAuthor>
      </CardHeader>

      <Image image={image}/>
      <CardBody>
        <CardIcons recipes={recipes} />
        {description &&
          <CardHeadingSub>{showDescription(description) || ''}</CardHeadingSub>}
          <hr />
          <div style={{
            display: 'flex',
            margin: '16px 8px 0 16px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{background: 'inherit', color: '#FC4F56', cursor: "pointer"}} onClick={() => history.push(`/recipe/${recipeData._id}`)}>ראה מתכון &#187;</p>

            <Btn 
              style={{height: '32px', borderRadius: '4px', fontSize: '12px'}}
              onClick={(e) => addBtn(e)}
            >הוסף למטבח</Btn>
          </div>
      </CardBody>
    </CardWrapper>
  )
}

export default withRouter(RecipeCard);
