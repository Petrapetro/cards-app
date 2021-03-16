import React, { useState } from 'react'
import SetList from '../sets/SetList'
import './styles.css'
import {
  Switch,
  Route,
} from 'react-router-dom'
import SetForm from '../addNewSet/SetForm'
import EditSet from '../edit/EditSet'

const Workbench = ({ id }) => {
  const [cardSetId, setCardSetId] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [cardSet, setCardSet] = useState(undefined)

  return (
    <div className="wrapper-workbench">
      <Switch>
        <Route exact path={`/user/${id}`}>
          {<SetList
            userId={id}
            cardSetId={cardSetId}
            setCardSetId={setCardSetId}
            name={name}
            setName={setName}
            cardSet={cardSet}
            setCardSet={setCardSet}
          />}
        </Route>
        <Route path={`/user/${id}/addNewSet`}>
          {<SetForm userId={id} />}
        </Route>
        <Route path={`/user/${id}/set/${cardSetId}/edit`}>
          {<EditSet
            userId={id}
            cardSetId={cardSetId}
            name={name}
            setName={setName}
            cardSet={cardSet} 
            setCardSet={setCardSet}
            />}
        </Route>
      </Switch>
    </div>
  )
}

export default Workbench