import React from 'react';
import * as Cookie from 'js-cookie';

export default (Component) => props =>
  Cookie.get('token')
    ? <Component {...props} isLogged={true} />
    : <Component {...props} isLogged={false} />
