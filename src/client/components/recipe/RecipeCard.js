import React from 'react';

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

export default ({recipeData}) => {
  const { time, difficulty, ingridients, description } = recipeData;
  const recipes = {
    time, difficulty, ingridients
  }
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>{recipeData.title || ''}</CardHeading>
        {recipeData.subtitle && 
          <CardHeadingSub>{recipeData.subtitle || ''}</CardHeadingSub>}
          <CardAuthor>{recipeData.author || 'no named'}</CardAuthor>
      </CardHeader>

      <Image {...recipeData.img} />
      <CardBody>
        <CardInstructions recipes={recipes} />
        <CardParagraph>{recipeData.description}</CardParagraph>
      </CardBody>
    </CardWrapper>

  );
};
