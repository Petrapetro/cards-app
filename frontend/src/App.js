import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Main from './components/main/Main'
import Header from './components/header/Header'
import Workbench from './components/workbench/Workbench'

function App() {
  const [auth, setAuth] = useState({ user: { name: null, id: null }, token: localStorage.getItem('token') })

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("token from localStorage: ", token)
    if (token) {
      axios.get('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { name, id } = data
        console.log({ auth })
        setAuth({ ...auth, user: { name, id } })
      })
        .catch(console.error)
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" >
            {!auth?.token ? <Main /> : <Redirect to="/user/:id" />}
          </Route>
          <Route path="/user/:id">
            {!auth?.token ? <Main /> : <Workbench />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
