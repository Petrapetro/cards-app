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
  const [auth, setAuth] = useState({ user: { name: null, id: null }, token: localStorage.getItem('token') })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      Axios.get('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { name, id } = data
        setAuth({ ...auth, user: { name, id } })
      })
        .catch(console.error)
    }
  })

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
