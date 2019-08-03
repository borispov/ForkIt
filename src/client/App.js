import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Kitchen from './pages/Kitchen';
import { recipes } from '../utils/fakedata';

const HelloTest = () => <h1>HelloTest</h1>

const initState = {
  recipes,
  visitors: 0,
}

export default ({state = initState}) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Home showSearch {...initState} />} />
        <Route exact path="/home" render={() => <Home showSearch {...initState} />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/kitchen" render={() => <Kitchen />} />
      </Switch>
    </>
  );
};
