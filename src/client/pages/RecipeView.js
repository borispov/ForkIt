import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import withSession from '../hoc/withSession';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
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

const RecipeContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  line-height: 24px;
`

const IconsWrapper = styled.div`
  padding: 4px 8px;
  margin-left: 6px;
  margin-right: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const IconDiv = styled.div`

`

const Icon = styled(FontAwesomeIcon)`
  position: relative;
  color: ${props => props.theme.card.color};
  font-size: 22px;
`

const Label = styled.label`
  color: ${props => props.theme.main};
  font-size: 18px;
`

const ImgWrap = styled.div`
  max-width: 620px;
  max-height: 460px;
`

const CookBtn = styled(Btn)`
  background: ${props => props.theme.main};
  color: ${props => props.theme.white};
`


const RecipeView = ({ recipe, match, session }) => {

  const _id = match.params.id


  // ADD MUTATIONS AND COOK RECIPE FUCNCTION HANDLER
  const showCookBtn = (
    session.getCurrentUser ?
      <CookBtn onClick={cookRecipe()}>I Cooked It!</CookBtn> : null
  )

  return (
    <Wrapper>
      <PageLayout>
        {
          session.getCurrentUser ?
            console.log(session.getCurrentUser) :
            console.log('not logged')
        }
        <Query query={GET_RECIPE} variables={{ _id: _id }} >

          {({ data, loading, err }) => {

            if (err) return <h1>{err}</h1>
            if (loading) return <h1> Loading ... </h1>
            console.log(data)

            return (
              <RecipeSingle
                data={data.getRecipe}
              />
            )
          }}

        </Query>
        {showCookBtn}

      </PageLayout>
    </Wrapper>
  )
}

export default withSession(withRouter(RecipeView))
