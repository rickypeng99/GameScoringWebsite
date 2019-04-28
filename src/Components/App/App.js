import React, { Component } from 'react';
//import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';



//import components
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
import Home from '../Home/Home.jsx'

class App extends Component {
  render() {
  
    return (

        <HashRouter>
          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/signup" component = {Signup} />
            <Route exact path = "/signin" component = {Signin} />

          </Switch>
        </HashRouter>
    );
  }
}

export default withAuthentication(App);
