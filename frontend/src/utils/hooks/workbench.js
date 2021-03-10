import { useState } from 'react'
import axios from 'axios'

const useWorkbench = ({sets, id}) => {
  const [studySets, setStudySets] = useState([])

  axios.get(`http://localhost:3000/user/${id}`)
  .then(response => {
    if (response.status === 200) {
      const { data } = response
      const { sets } = data
      setStudySets(sets)
    }
  })
  .catch(err => {
    const { data } = err.response
    const { message } = data
  })

}

export default useWorkbench