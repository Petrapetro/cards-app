import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useWorkbench from '../../utils/hooks/workbench'
import Sets from '../sets/Sets'
import './styles.css'

const Workbench = ({ id }) => {
  const [studySets, setStudySets] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${id}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { sets } = data
          setStudySets(sets)
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])
  return (
    <div className="wrapper">
      <h1 style={{marginTop: 0}}>Your Sets</h1>
      <Sets sets={studySets}></Sets>
    </div>
  )
}

export default Workbench