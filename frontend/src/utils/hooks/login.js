import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

const useLoginForm = (initialValues) => {
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
          if (response.status === 200) {
            const { data } = response
            const { token, username, id } = data
            localStorage.setItem('token', token)
            console.log({ username, token })
            history.push(`/user/${id}`)
          }
        })
        .catch(err => {
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