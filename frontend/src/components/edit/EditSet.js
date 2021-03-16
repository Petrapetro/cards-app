import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  TextField
} from '@material-ui/core'
import axios from 'axios'

const EditSet = ({ userId, cardSetId, name, setName }) => {
  const [cardSet, setCardSet] =useState('')

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}/set/${cardSetId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          console.log({cards})
          setCardSet(cards)
          console.log({cardSetId, cardSet})
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
      <h1>Edit {name}</h1>
      <p>Some text</p>
     {/*  <form onSubmit={handleSubmit}>
        <TextField
          type="setname"
          placeholder="name"
          name="setname"
          id="setname"
          color="primary"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        {cardSet.map(({text, flippedText, id}) => (
          <FormControl key={id}>
                <TextField
                  type="text"
                  placeholder="text"
                  name="text"
                  id="text"
                  color="primary"
                  value={text}
                  onChange={(e) => handleChange(e)}
                  />
                <TextField
                  type="flippedText"
                  placeholder="flippedText"
                  name="flippedText"
                  id="flippedText"
                  color="primary"
                  value={flippedText}
                  onChange={(e) => handleChange(e)}
                  />
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
            </form> */}
    </div>
  )
}

export default EditSet
