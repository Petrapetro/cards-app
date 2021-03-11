import React from 'react'
import './styles.css'

const Header = () => {
  const auth = undefined
  return (
    <div>
      {!auth?.user?.name ?
        <><div className="header-unAuth">
          <h1 className="title">Cards</h1>
        </div></>
        :
        <><div className="header-Auth">
          <h1 className="title">Cards</h1>
        </div></>
      }
    </div>
  )
}

export default Header
