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
  const { image, name, instructions, time, difficulty, ingridients, description, author } = recipeData;
  const recipes = {
    time, difficulty, ingridients, instructions
  }
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>{name || ''}</CardHeading>
        {description &&
          <CardHeadingSub>{description || ''}</CardHeadingSub>}
          <CardAuthor>{author || 'no named'}</CardAuthor>
      </CardHeader>

      <Image image={image} />
      <CardBody>
        <CardInstructions recipes={recipes} />
        {/*<CardParagraph>{recipeData.description}</CardParagraph> */}
      </CardBody>
    </CardWrapper>

  );
};
