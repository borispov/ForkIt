import React from 'react';
import App from './App';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';
import Global from '../utils/global-style';

export default ({ url, context }) => {
  return (
    <StaticRouter context={context} location={url}>
      <App />
      <Global />
    </StaticRouter>
  );
};
