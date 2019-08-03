import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';
import { hydrate } from 'react-dom';
import client from '../utils/apolloState';


const ClientRouter = ({ state={} }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <App state/>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

hydrate(
  <ClientRouter state={window__STATE__} />, 
  document.getElementById('root')
);
