import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Main from './components/main/Main'
import Header from './components/header/Header'
import Workbench from './components/workbench/Workbench'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/welcome">
            <Main />
          </Route>
          <Route path="/user/:id">
            <Workbench />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
