import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Auth from './components/auth/Auth'
import SignUp from './components/signup/SignUp'
import Main from './components/main/Main'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/cards">
            <Main />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
