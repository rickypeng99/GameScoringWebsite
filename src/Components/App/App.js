import React, { Component } from 'react';
//import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';


//import components
import Signup from '../Signup/Signup'


class App extends Component {
  render() {
  
    return (
      
      <HashRouter>
        <Switch>
          <Route exact path = "/signup" component = {Signup} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
