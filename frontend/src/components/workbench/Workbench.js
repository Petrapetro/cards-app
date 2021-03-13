import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useWorkbench from '../../utils/hooks/workbench'
import SetList from '../sets/SetList'
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
    <div className="wrapper-workbench">
      <SetList userId={id} sets={studySets} />
    </div>
  )
  }

export default Workbench