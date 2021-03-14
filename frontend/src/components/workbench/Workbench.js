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

  return (
    <div className="wrapper-workbench">
      <Switch>
        <Route exact path={`/user/${id}`}>
          {<SetList userId={id} />}
        </Route>
        <Route path={`/user/${id}/addNewSet`}>
          {<SetForm userId={id}/>}
          </Route>
      </Switch>
    </div>
  )
}

export default Workbench