import React from 'react'
import './styles.css'

const Header = ({ auth }) => {
  return (
    <div>
      {auth?.token ?
        <><div className="header-Auth">
          <a className="addNew" href="/addNew">Add new Set</a>
          <h1 className="title">Cards</h1>
          <a className="logout" href="/logout">Logout</a>
        </div></>
        :
        <><div className="header-unAuth">
          <h1 className="title-unAuth">Cards</h1>
        </div></>
      }
    </div>
  )
}

export default Header
