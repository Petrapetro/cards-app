import React from 'react'
import SignUp from '../../components/signup/SignUp'
import Auth from '../../components/auth/Auth'
import Cards from '../../components/card/Card'

const Main = () => {
  return (
    <div style={{
      textAlign: 'center',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15em',
        
      }}>
        <div style={{
          display: "block",
          width: "25%",
        }}>
          <Cards
            children={<Auth />} name="Login" /></div>
        <div style={{
          display: "block",
          width: "25%"
        }}>
          <Cards
            children={<SignUp />} name="Sign Up" /></div>
      </div>
    </div>
  )
}

export default Main
