import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/main.jsx';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = { MainPage }/>
      </Switch>
    </HashRouter>
  );
}

export default App;
