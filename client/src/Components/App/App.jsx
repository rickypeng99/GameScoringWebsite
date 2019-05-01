import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/main.jsx';
import Detail from '../DetailPage/detail.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faCommentAlt)

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = { MainPage }/>
        <Route exact path='/detail' component={Detail} />
      </Switch>
    </HashRouter>
  );
}

export default App;