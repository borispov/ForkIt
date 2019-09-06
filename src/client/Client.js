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
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3000/graphql',
    fetch: fetch
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const ClientRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <App />
          </ApolloHooksProvider>
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  );
};

hydrate(
  <ClientRouter />,
  document.getElementById('root')
);
