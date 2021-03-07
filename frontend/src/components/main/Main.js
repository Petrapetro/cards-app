import React from 'react'
import SignUp from '../../components/signup/SignUp'
import Auth from '../../components/auth/Auth'
import Cards from '../../components/card/Card'

const Main = () => {
  return (
    <div style={{
      textAlign: 'center'    }}>
      <h1>Cards!</h1>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10em'
      }}>
        <div style={{
          display: "inline-block",
          width: "25%"
        }}>
          <Cards
            children={<Auth />} name="Login" /></div>
        <div style={{
          display: "inline-block",
          width: "25%"
        }}>
          <Cards
            children={<SignUp />} name="Sign Up" /></div>
      </div>
    </div>
  )
}

export default Main
