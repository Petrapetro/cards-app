import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const useRegForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    if (!inputs.username || !inputs.password ) {
      setErrorMessage('Username and password required.')
    } else if (inputs.password.length < 8) {
      setErrorMessage('Password must be 8 characters.')
    } else {
      setErrorMessage('')

      const username = inputs.username
      const password = inputs.password

      const params = JSON.stringify({
        username,
        password,
      })
      axios.post('http://localhost:3000/signup', params, {
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
          history.push('/auth')
        })
        .catch(err => 
          setInputs({ ...inputs, errorMessage: err.response.data.message }))
    }
  }

  const handleInputChange = (e) => {
    e.persist()
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  return {
    inputs,
    handleSubmit,
    handleInputChange,
    errorMessage
  }
}

export default useRegForm