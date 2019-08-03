import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { recipes } from './fakedata';

const defaultState = {
  recipes: recipes
  // TODO: Design App's State Tree. what needs to live here?
}

export default new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: 'http://localhost:3000',
    cache: process.browser
            ? new InMemoryCache().restore(window.__APOLLO_STATE__)
            : new InMemoryCache()
})
