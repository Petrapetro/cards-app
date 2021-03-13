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
  const [auth, setAuth] = useState({ user: {name: undefined, id: undefined}, token: localStorage.getItem('token') })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAuth({ user: { name: undefined, id: undefined }, token: undefined})
    }
    if (token) {
      axios.get('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { name, id } = data
        setAuth({ ...auth, user: { name, id } })
      })
        .catch(console.error)
    }
  }, [])

  return (
    <div className="App">
      <Header auth={auth} />
      <Router>
        <Switch>
          <Route exact path="/" >
            {!auth?.token ? <Main auth={auth} setAuth={setAuth}/> : <Redirect to={`/user/${auth.user.id}`} />}
          </Route>
          <Route path={`/user/${auth.user.id}`}>
            {!auth?.token ? <Redirect to="/"/> : <Workbench id={auth.user.id}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
