import React from 'react';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../../queries';
import * as Cookie from 'js-cookie';

import Login from '../pages/Login';

import { Query } from 'react-apollo';

const withAuth = condFn => Component => props => {

  if (props.testing = 'true'){
    return <Component {...props />}
  }

  return (

    <Query query={GET_CURRENT_USER}>

      {( {data, loading, error, refetch} ) => {

        if ( loading ) return null

        if (typeof document !== 'undefined') {

          const tokenExp = Cookies.get('token')

          if (tokenExp == undefined) return <Login {...props} refetch={refetch} />

        }

        if (props.session.getCurrentUser == null) return <Login {...props} refetch={refetch} />

        return condFn(data) ? <Component {...props} /> : <Redirect to="/login" />

      }}

    </Query>
  )
}

export default withAuth

// Big Thanks to simpleTut -- brutally stole this component for assissting with auth.
