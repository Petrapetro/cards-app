import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

const useLoginForm = (initialValues, auth, setAuth) => {
  const [inputs, setInputs] = useState(initialValues)
  const [loginErrorMessage, setLoginErrorMessage] = useState("")
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputs.username || !inputs.password) {
      setLoginErrorMessage("All the input fields are required.")
    } else {
      axios.post("http://localhost:3000/login", inputs)
        .then(response => {
          console.log({response})
          if (response.status === 200) {
            const { data } = response
            const { token, user } = data
            console.log({token, user })
            setAuth({ user, token })
            localStorage.setItem('token', token)
            history.push(`/user/${user.id}`)
          }
        })
        .catch(err => {
          console.error(err)
          const { data } = err.response
          const { message } = data
          setLoginErrorMessage(message)
        })
    }
  }

  const handleChange = (e) => {
    e.persist()
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  return {
    handleSubmit,
    handleChange,
    inputs,
    loginErrorMessage
  }
}

export default useLoginForm