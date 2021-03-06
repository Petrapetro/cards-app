import React from 'react'
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import useRegForm from '../../utils/hooks/signUp'

const SignUp = () => {
  const { inputs, handleSubmit, handleInputChange, errorMessage } = useRegForm({
    username: '',
    password: '',
    errorMessage: ''
  })

  return (
    <div>
      <h2>Sign up</h2>
      <div>
        <form onSubmit={handleSubmit} id="form" action="" method="POST">
          <FormControl
            error={errorMessage !== ''}
          >
            <TextField
              onChange={handleInputChange}
              value={inputs.username}
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <TextField
              id="component-error"
              type="password"
              name="password"
              value={inputs.password}
              placeholder="Password"
              onChange={handleInputChange}
              aria-describedby="component-error-text"
              color="secondary"
            />
            <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>
          </FormControl>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp