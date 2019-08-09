import React from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';
import RecipeList from '../components/RecipeList';
import { Query } from 'react-apollo';
import { GET_RECIPES } from '../../queries';
import gql from 'graphql-tag';

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

      <Query query={GET_RECIPES}>

        {({ loading, error, data }) => {

          if ( loading ) return `<h3> Loading ... </h3>`
          if ( error ) return `<h5> Error: ${error} </h5>`

          console.log(data.getAllRecipes)
          return ( 
            <RecipeList data={data.getAllRecipes} />
          )
        }}

      </Query>

    </PageLayout>
  )

};
