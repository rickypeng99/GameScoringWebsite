import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/main.jsx';
import Detail from '../DetailPage/detail.jsx';
import { withAuthentication } from '../withAuth';
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = {MainPage}/>
        <Route exact path='/detail/:game_id' component={Detail} />
        <Route exact path='/signup' component = {Signup}/>
      </Switch>
    </HashRouter>
  );
}

export default withAuthentication(App);