import React from 'react';
import RecipeList from '../components/RecipeList';
import PageLayout from '../components/PageLayout';
import { Query } from 'react-apollo';
import { GET_RECIPES } from '../../queries';

const homeProps = {
  title: 'Da- Kitchen',
}

const Kitchen = ({recipes}, props) => {
  return (
    <PageLayout {...homeProps} showSearch={false}>

      <Query query={GET_RECIPES} variables={{author: 'anonymous'}}>

        {({ loading, error, data }) => {

          if ( loading ) return `<h3> Loading ... </h3>`
          if ( error ) return `<h5> Error: ${error} </h5>`

          return ( 
            <RecipeList data={data.getAllRecipes} layout='list' />
          )
        }}

      </Query>

    </PageLayout>
  )

};

export default Kitchen;