import React from 'react';
import { withRouter } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import PageLayout from '../components/PageLayout';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';
import withAuth from '../hoc/withAuth';
import { useQuery } from '@apollo/react-hooks';

const homeProps = {
  title: 'Da- Kitchen',
}

const Kitchen = ({recipes, session }, props) => {

  return (
    <PageLayout {...homeProps} showSearch={false}>

      <Query query={GET_USER_RECIPES} variables={{author: session.getCurrentUser.email}}>

        {({ loading, error, data }) => {

          if ( loading ) return `<h3> Loading ... </h3>`
          if ( error ) return `<h5> Error: ${error} </h5>`

          console.log('recs: ', data)

          return ( 
            <RecipeList data={data.getUserRecipes} layout='list' />
          )
        }}

      </Query>

    </PageLayout>
  )

}

const condFn = session => session && session.getCurrentUser
export default withAuth(condFn)(withRouter(Kitchen))
