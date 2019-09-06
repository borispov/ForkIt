import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import withSession from '../hoc/withSession';
import { Query, Mutation } from 'react-apollo';
import { GET_RECIPE, COOK_RECIPE } from '../../queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCube } from '@fortawesome/free-solid-svg-icons';
import { faStackExchange  } from '@fortawesome/free-brands-svg-icons';
import Btn from '../components/styling/Btn';
import RecipeSingle from '../components/recipe/RecipeSingle';

const Wrapper = styled.div`
  margin-top: 62px;
  margin-left: auto;
  margin-right: auto;
`

const CookBtn = styled(Btn)`
  background: ${props => props.theme.main};
  color: ${props => props.theme.white};
  margin: 0 auto;
  display: block;
`


// TODO: if user is not logged in and clicks Cook Button,redirect him to Login page
const RecipeView = ({ recipe, match, session = {} }) => {

  const _id = match.params.id

  const submitCook = (_id, cb) => {
    if (!_id || !session.getCurrentUser.email) {
      console.log('Missing Parameters For Mutation Query')
      return null
    }
    const _recID = _id
    const email = session.getCurrentUser.email
    console.log(`
      the recID: ${_recID}
      the email: ${email}
    `)
    cb(_recID, email)
  }

  return (
    <Wrapper>
        <Query query={GET_RECIPE} variables={{ _id: _id }} >

          {({ data, loading, err }) => {

            if (err) return <h1>{err}</h1>
            if (loading) return <h1> Loading ... </h1>
            console.log(data)

            return (
              <PageLayout title={data.getRecipe.name}>
                <RecipeSingle data={data.getRecipe} />
                {
                  session.getCurrentUser ?
                    (
                      <Mutation
                        mutation={COOK_RECIPE}
                        variables={{
                          _recID: _id,
                          email: session.getCurrentUser.email
                        }} >

                        {(cookRecipe, { data }) => (
                          <CookBtn onClick={() => submitCook(_id, cookRecipe)}>הרגע בישלתי!</CookBtn>
                        )}

                      </Mutation>
                    ) : null
                }
              </PageLayout>
            )
          }}

        </Query>


    </Wrapper>
  )
}

export default withSession(withRouter(RecipeView))
