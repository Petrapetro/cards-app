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

  const handleChange = () => {

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
        {cardSet.map(({text, flippedText, id}, index) => (
          <FormControl key={id} style={{margin: '.5em'}}>
            <h3>Card {index}:</h3>
                <TextField
                  className="card-input"
                  type="text"
                  placeholder="text"
                  name="text"
                  id="text"
                  color="primary"
                  value={text}
                  onChange={(e) => handleChange(e)}
                  />
                <TextField
                  className="card-input"
                  type="flippedText"
                  placeholder="flippedText"
                  name="flippedText"
                  id="flippedText"
                  color="primary"
                  value={flippedText}
                  onChange={(e) => handleChange(e)}
                  />
              <hr/>
              </FormControl>
                  ))}
              <div>
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
