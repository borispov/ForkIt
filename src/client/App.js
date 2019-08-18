import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Kitchen from './pages/Kitchen';
import { recipes } from '../utils/fakedata';
import AddRecipe from './pages/AddRecipe';
import RecipeView from './pages/RecipeView';
import SignUp from './pages/SignUp';
import SignOut from './pages/Signout';
import Login from './pages/Login';
import withSession from './hoc/withSession';

const HelloTest = () => <h1>HelloTest</h1>

const initState = {
  recipes,
  visitors: 0,
}

const App = ({state = initState, refetch, session}) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Home showSearch {...initState} session={session} />} />
        <Route exact path="/home" render={() => <Home showSearch {...initState} session={session} />} />
        <Route exact path="/signup" render={(props) => <SignUp {...props} refetch={refetch} />} />
        <Route path="/login" render={props => <Login {...props} refetch={refetch} />} />
        <Route path="/logout" render={props => <SignOut {...props} />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/kitchen" render={props => <Kitchen {...props} session={session} />} />
        <Route exact path="/addrecipe" render={props => <AddRecipe {...props} session={session} refetch={refetch} />} />
        <Route path="/recipe/:id" render={props => <RecipeView {...props} refetch={refetch} session={session} />} />
      </Switch>
    </>
  );
};

export default withSession(App)
