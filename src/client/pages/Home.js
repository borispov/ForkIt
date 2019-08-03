import React from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';
import RecipeList from '../components/RecipeList';

const mapRecipes = rec => <li><RecipeCard recipeData={rec} /></li>

const List = styled.ul`
  list-style: none;
`

const homeProps = {
  title: 'Hot Trends, Hot Recipes',
}

export default ({recipes}, props) => {
  return (
    <PageLayout {...homeProps} showSearch={false}>
      <RecipeList data={recipes} />
    </PageLayout>
  )

};
