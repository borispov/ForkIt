import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import RecipeView from '../../pages/RecipeView';

const {CardWrapper,
  CardHeading,
  CardHeadingSub,
  CardBody,
  CardHeader,
  CardParagraph,
  CardInstructions,
  CardAuthor
} = require('./RecipeCardStyles');
const { Image } = require('../image/Image');

export default withRouter(({recipeData, history}) => {
  const { image, name, instructions, time, difficulty, ingridients, description, author, _id } = recipeData;
  const recipes = {
    time, difficulty, ingridients, instructions
  }
  return (
    <CardWrapper>
      <CardHeader onClick={() => history.push(`/recipe/${recipeData._id}`)} >
        <CardHeading>{name || ''}</CardHeading>
        {description &&
          <CardHeadingSub>{description || ''}</CardHeadingSub>}
          <CardAuthor>{author || 'no named'}</CardAuthor>
      </CardHeader>

      <Image image={image}/>
      <CardBody>
        <CardInstructions recipes={recipes} />
      </CardBody>
    </CardWrapper>

  )
}
)
