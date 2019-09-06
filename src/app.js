import path from 'path';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';
import React from 'react';
import ReactaDOMServer, {renderToString } from 'react-dom/server';
import styled, { ThemeProvider, ServerStyleSheet} from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import cors from 'cors';

import template from './views/template';
import ServerRouter from './client/ServerRouter';
import theme from './utils/theme';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { User, RecipeList } from './models/User';
import Recipe from './models/Recipe';

const app = express();

// app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(express.static("./dist"))

app.use(async (req, res, next) => {

  const token = req.cookies.token ? req.cookies.token : null;
  if (token !== null) {
    try {
      const currentUser = await jwt.verify(token, 'secret' );
      req.currentUser = currentUser;
    } catch (err) {
      console.error('Error Occured In Token: ', err);
      console.log('-------------------')
      console.log('--Clearing Cookie--')
      console.log('-------------------')
      res.clearCookie('token');
    }
  }
  next();
});

// with new way after apollo migration to v2
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({
    currentUser: req.currentUser,
    Recipe,
    User, 
    RecipeList
  })
})


apolloServer.applyMiddleware({ app })
// replace < code
// .replace(/</g, '\u003c')
const HTML = (jsx, tags, state) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>GoodRise</title>
        ${tags}
    </head>

    <body>
        <div id="root">${ jsx }</div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        <script src="/bundled_main.js" defer></script>
    </body>
    </html>
  `
}


app.get(['*/:param', '*'], (req,res) => {

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `http://localhost:3000/graphql`,
      fetch: fetch,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const URL_Param = req.params.param ? req.params.param : null
  const sheet = new ServerStyleSheet();
  const context = {
    URL_Param
  }

  const RootApp = (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider theme={theme}>
          <ServerRouter url={req.url} context={context} />
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );


  getDataFromTree(RootApp)

  const initialApolloState = client.extract()
  // const jsx = renderToString(sheet.collectStyles(RootApp));
  const dom = renderToString(RootApp)
  const styleTags = sheet.getStyleTags();

  res.writeHead(200, {"Content-Type": "text/html"})
  res.end(HTML( dom, styleTags, initialApolloState ))

  // set this date to Apollo State. Later pass it to the markup, ie client.
})

export default app
