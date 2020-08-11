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
import MessagesIndex from './messages/messages_index';
import MessageForm from './messages/message_form';
// import UserWagersShow from './users/user_wagers_show';


const App = () => (
  <div>
    <header>
      <h1>Header goes here</h1>
      <NavBarContainer />
    </header>

    <Switch>
      {/* <Route path="/users/bets/:userId" component={UserWagersShow}/> */}
      <ProtectedRoute exact path="/messages/form" component={MessageForm} />
      <Route exact path="/messages" component={MessagesIndex} />
      <Route exact path="/" component={WagersIndex} />
      <ProtectedRoute exact path="/wagers/:wagerId" component={WagerShow} />
      <Route path="/users/:userId" component={Profile} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>

    <footer>Copyright &copy; 2020 Wager</footer>
  </div>
);

export default App;