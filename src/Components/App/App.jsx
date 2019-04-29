import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Detail from '../DetailPage/detail.jsx';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = { Detail }/>
      </Switch>
    </HashRouter>
  );
}

export default App;
