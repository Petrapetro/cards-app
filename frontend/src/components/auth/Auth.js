import React from 'react'
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import useLoginForm from '../../utils/hooks/login.js'

const Auth = ({ auth, setAuth }) => {

  const { inputs, handleChange, handleSubmit, loginErrorMessage } = useLoginForm({
    username: '',
    password: '',
    loginErrorMessage: '',
  }, auth, setAuth)

  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <FormControl
            error={loginErrorMessage !== ''}>
            <TextField
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              color="primary"
              value={inputs.username}
              onChange={handleChange}
            />
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              color="primary"
              value={inputs.password}
              onChange={handleChange}
            />
            <FormHelperText>{loginErrorMessage}</FormHelperText>
          </FormControl>
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth