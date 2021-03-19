import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  TextField
} from '@material-ui/core'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './styles.css'

const EditSet = ({ name, setName, cardSet, setCardSet }) => {
  const { userid, setid } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userid}/set/${setid}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          console.log({ cards })
          setCardSet(cards)
          console.log({ setid, cardSet })
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])

  const handleChange = (e, cardid, index) => {
    e.persist()
    console.log(cardid)
    if (e.target.name === "flippedText") {
      const card = cardSet.filter(({id, text, flippedText, setId}) => {
           if (id === cardid) {
             return id, text, flippedText, setId
      }}
     )
      console.log(card)
      card[0].flippedText = e.target.value
      console.log(card)
      let updatedCardSet = [...cardSet]
      console.log({updatedCardSet})
      updatedCardSet.map(({id}, i) => {
      if (id === cardid && i === index) {
        updatedCardSet[i] = card
      }})
      setCardSet(updatedCardSet)
    }
    if (e.target.name === "text") {
      const card = cardSet.filter(({id}) =>
       id === cardid )
      card.text = e.target.value
      setCardSet([...cardSet, cardSet[index] = card])
    }
    if (cardid === undefined && index === undefined) {
      setName(e.target.value)
    } 
  }

  const handleSubmit = () => {

  }
  return (
    <div>
      <h1>Edit "{name}"</h1>
      <form onSubmit={handleSubmit}>
        <h2>Set title: </h2>
        <TextField
          className="edit-title"
          type="setname"
          placeholder="name"
          name="setname"
          id="setname"
          color="primary"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        {cardSet.map(({ text, flippedText, id }, index) => (
          <FormControl key={id} style={{ margin: '.5em' }}>
            <h3>Card {parseInt(index) + 1}:</h3>
            <TextField
              className="card-input"
              type="text"
              placeholder="text"
              name="text"
              id="text"
              color="primary"
              value={text}
              onChange={(e) => handleChange(e, id, index)}
            />
            <TextField
              className="card-input"
              type="flippedText"
              placeholder="flippedText"
              name="flippedText"
              id="flippedText"
              color="primary"
              value={flippedText}
              onChange={(e) => handleChange(e, id, index)}
            />
            <hr />
          </FormControl>
        ))}
        <div className="buttons">
          <Button
            variant="contained"
            color="secondary"
          >
            Add another card
            </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit changes
            </Button>
        </div>
      </form>
    </div>
  )
}

export default EditSet
