import { AppBar, Toolbar } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Header = ({ auth, setAuth }) => {
  const logOut = () => {
    localStorage.clear("token")
    setAuth({user: null, token: null})
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        {auth?.token ?
          <><div className="header-Auth">
            <NavLink className="addNew" to={`/user/${auth.user.id}/addNewSet`}>Add new Set</NavLink>
            <NavLink className="header-title" to="/">Cards</NavLink>
            <NavLink className="logout" to="/" onClick={logOut}>Logout</NavLink>
          </div></>
          :
          <><div className="header-unAuth">
            <NavLink className="header-title" to="/">Cards</NavLink>
          </div></>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
