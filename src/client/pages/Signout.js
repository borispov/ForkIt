import React, { useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from 'styled-components';
import * as Cookie from 'js-cookie';
import { withRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const Title = styled.h1`
  color: #191919;
  margin: 140px auto 0;
  text-align: center;
`

// Future TODO: Implement Logout component within a Modal

const SignOut = ({ history }) => {

  const handleSignout = (client, history) => {
    console.log('logged Out')
    Cookie.remove('token')
    client.resetStore()
    history.push('/home')
  }

  return (
    <PageLayout>
      <ApolloConsumer>
        {client => {
          return (
            <>
              <Title> Good Bye . . . </Title>
              {
                setTimeout(() => handleSignout(client, history), 2500)
              }
            </>
          )
        }}
      </ApolloConsumer>
    </PageLayout>
  )
}

export default withRouter(SignOut)
