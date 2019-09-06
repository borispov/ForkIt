import React from 'react';
import fetch from 'node-fetch';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';
import { hydrate } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3000/graphql',
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    },
    fetch: fetch
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const ClientRouter = ({ state={} }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

// state={window.__STATE__} 

hydrate(
  <ClientRouter />,
  document.getElementById('root')
);
