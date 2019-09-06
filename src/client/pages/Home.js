import React from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';
import RecipeList from '../components/RecipeList';
import { Query } from 'react-apollo';
import { GET_RECIPES } from '../../queries';

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

          if ( loading ) return <h3 style={{margin: '40px auto', textAlign: 'center'}}> Loading ... </h3>
          if (error) {
            console.log(error)
          }
          if ( error ) return <h5 style={{margin: '40px auto', textAlign: 'center'}}> Error: ${error.msg} </h5>

          return ( 
            <RecipeList data={data.getAllRecipes} />
          )
        }}

      </Query>

    </PageLayout>
  )

};
