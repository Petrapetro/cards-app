import React from 'react'
import SignUp from '../../components/signup/SignUp'
import Auth from '../../components/auth/Auth'
import Cards from '../../components/card/Card'
import './styles.css'

const Main = () => {
  return (
      <div className="main-wrapper">
        <div><Cards children={<Auth />} name="Login" /></div>
        <div id="secondCard"><Cards children={<SignUp />} name="Sign Up" /></div>
      </div>
  )
}

export default Main
