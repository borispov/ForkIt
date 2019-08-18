import React from 'react';
import { withRouter } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import PageLayout from '../components/PageLayout';
import { Query } from 'react-apollo';
import { GET_RECIPES } from '../../queries';
import withAuth from '../hoc/withAuth';

const homeProps = {
  title: 'Da- Kitchen',
}

const Kitchen = ({recipes, session}, props) => {
  return (
    <PageLayout {...homeProps} showSearch={false}>
      {
        console.log(
          recipes
        )
      }

      <Query query={GET_RECIPES} variables={{author: session.getCurrentUser.email}}>

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

export default withAuth(session => session && session.getCurrentUser)(withRouter(Kitchen))
