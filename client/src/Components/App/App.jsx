import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/main.jsx';
import Detail from '../DetailPage/detail.jsx';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = { MainPage }/>
        <Route exact path='/detail/:game_id' component={Detail} />
      </Switch>
    </HashRouter>
  );
}

export default App;