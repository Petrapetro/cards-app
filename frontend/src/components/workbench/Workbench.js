import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SetList from '../sets/SetList'
import {
  Switch,
  Route,
} from 'react-router-dom'
import SetForm from '../addNewSet/SetForm'
import EditSet from '../edit/EditSet'
import LearnSet from '../learn/LearnSet'

const Workbench = ({ id }) => {
  const [cardSetId, setCardSetId] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [cardSet, setCardSet] = useState(undefined)
  const [studySets, setStudySets] = useState(null)

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

  const openSet = (setId, setname) => {
    axios.get(`http://localhost:3000/user/${id}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          console.log("open set", { setname, cards, setId })
          setName(setname)
          setCardSet(cards)
          setCardSetId(setId)
          console.log("open set", { name, cardSetId, cardSet })
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  return (
    <div>
      <Switch>
        <Route exact path="/user/:userid">
          {<SetList
            cardSetId={cardSetId}
            setCardSetId={setCardSetId}
            name={name}
            setName={setName}
            cardSet={cardSet}
            setCardSet={setCardSet}
            studySets={studySets}
            setStudySets={setStudySets}
            openSet={openSet}
          />}
        </Route>
        <Route path="/user/:userid/addNewSet">
          {<SetForm />}
        </Route>
        <Route path="/user/:userid/set/:setid/edit">
          {<EditSet
            name={name}
            setName={setName}
            cardSet={cardSet} 
            setCardSet={setCardSet}
            />}
        </Route>
        <Route path="/user/:userid/set/:setid/learn">
          {<LearnSet/>}
        </Route>
      </Switch>
    </div>
  )
}

export default Workbench