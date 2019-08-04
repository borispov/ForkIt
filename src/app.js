import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';
import React from 'react';
import ReactaDOMServer, {renderToString, renderToStaticMarkup} from 'react-dom/server';
import styled, { ThemeProvider, ServerStyleSheet} from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloServer, gql } from 'apollo-server-express';

import template from './views/template';
import client from './utils/apolloState';
import ServerRouter from './client/ServerRouter';
import theme from './utils/theme';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import User from './models/User';
import Recipe from './models/Recipe';

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "dist")));
app.use(cookieParser())

// app.use("/", express.static(path.resolve(__dirname, "dist")));

app.use(async (req, res, next) => {

  const token = req.cookies.token ? req.cookies.token : null;
  if (token !== null) {
    try {
      const currentUser = await jwt.verify(token, 'secret' );
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
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
    User
  })
})

apolloServer.applyMiddleware({ app })

app.get("/*", (req,res) => {
  const context = req.params.param ? req.params.param : null
  const sheet = new ServerStyleSheet();
  const RootApp = () => (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ServerRouter url={req.url} context={context} />
      </ThemeProvider>
    </ApolloProvider>
  );

  // fetch the data across RootApp components.
  // try {
  //   getDataFromTree(<RootApp />)
  // } catch(e) {
  //   console.log('getDataFromTree, found an error: ', e)
  // }
  
  getDataFromTree(RootApp).then(() => {

    const initialApolloState = client.extract()
    const jsx = renderToString(sheet.collectStyles(<RootApp />));
    const styleTags = sheet.getStyleTags();
    const templated = template(jsx, styleTags, 'Hello Page', initialApolloState);

    // TODO: DO I need this markUp method???
    res.send(`<!doctype html>\n${renderToStaticMarkup(templated)}`)
    res.end()
  })

  // set this date to Apollo State. Later pass it to the markup, ie client.
})

export default app
