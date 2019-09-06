import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import RecipeView from '../../pages/RecipeView';
import Btn from '../styling/Btn';
import { Mutation } from 'react-apollo';
import { ADD_TO_KITCHEN } from '../../../queries';
import withAuth from '../../hoc/withAuth';

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

// TODO: Add To Kitchen handler for btn

export default withRouter(({recipeData, history}) => {
  const { image, name, instructions, time, difficulty, ingridients, description, author, _id } = recipeData;
  const recipes = {
    time, difficulty, ingridients, instructions
  }

  const cutText = txt => txt.substr(0, 93) + '...'
  const showDescription = txt => txt.length > 93 ? cutText : txt

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
            <Btn style={{height: '32px', borderRadius: '4px', fontSize: '12px'}}onClick={() => null}>הוסף למטבח</Btn>
          </div>
      </CardBody>
    </CardWrapper>

  )
}
)


