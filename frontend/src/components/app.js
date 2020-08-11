import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import {Route} from 'react-router-dom';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import WagersIndex from './wagers/wagers_index';
import WagerShow from './wagers/wager_show';
import Profile from './users/profile_show';


const App = () => (
  <div>
    <header>
      <h1>Header goes here</h1>
      <NavBarContainer />
    </header>

    <Switch>
        <Route exact path="/" component={WagersIndex} />
        <ProtectedRoute exact path="/wagers/:wagerId" component={WagerShow} />
        <Route exact path="/users/:userId" component={Profile} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>

    <footer>
      Copyright &copy; 2020 Wager
    </footer>
  </div>
);

export default App;