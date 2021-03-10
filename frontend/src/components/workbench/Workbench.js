import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useWorkbench from '../../utils/hooks/workbench'

function Workbench() {
  const [studySets, setStudySets] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/user/:id`)
  .then(response => {
    if (response.status === 200) {
      const { data } = response
      const { sets } = data
      setStudySets(sets)
    }
  })
  .catch(err => {
    console.log({err})
  })

  })
  return (
    <div className="wrapper">
      <h1>What's Cards?</h1>
      <p>{studySets}</p>
    </div>
  )
}

export default Workbench