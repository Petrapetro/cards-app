import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useWorkbench from '../../utils/hooks/workbench'
import SetList from '../sets/SetList'
import './styles.css'
import {
  Switch,
  Route,
} from 'react-router-dom'
import SetForm from '../addNewSet/SetForm'

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
      <Switch>
        <Route exact path={`/user/${id}`}>
          {<SetList userId={id} sets={studySets} />}
        </Route>
        <Route path={`/user/${id}/addNewSet`}>
          {<SetForm userId={id}/>}
          </Route>
      </Switch>
    </div>
  )
}

export default Workbench