import React from 'react'
import SignUp from '../../components/signup/SignUp'
import Auth from '../../components/auth/Auth'
import Welcome from '../../components/welcome/Welcome'
import Cards from '../../components/card/Card'
import './styles.css'

const Main = ({ auth, setAuth }) => {
  return (
      <div className="main-wrapper">
        <div><Cards children={<Welcome />} name="Welcome!"/></div>
        <div id="secondCard"><Cards children={<Auth auth={auth} setAuth={setAuth}/>} name="Login" /></div>
        <div id="thirdCard"><Cards children={<SignUp />} name="Sign Up" /></div>
      </div>
  )
}

export default Main
