import {
  Button,
  FormControl,
  InputBase,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

const SetForm = ({ userId }) => {
  const [cards, setCards] = useState([[]])
  const [setname, setSetname] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [flippedText, setFlippedText] = useState(undefined)
  const history = useHistory()

  const handleChange = (e) => {
    e.persist()
    if (e.target.name === "flippedText") {
      setFlippedText(e.target.value)
    }
    if (e.target.name === "text") {
      setText(e.target.value)
    }
    if (e.target.name === "setname") {
      setSetname(e.target.value)
    }
  }

  const addWord = () => {
    if (text !== undefined && flippedText !== undefined &&
      text !== '' && flippedText !== '') {
      if(cards[0] === []) {
        console.log({cards})
        setCards({text, flippedText})
        setCards(cards.shift())
      } else {
        setCards([...cards, {text, flippedText}])
      }
      console.log({ cards })
      setText('')
      setFlippedText('')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (setname) {
      axios.post(`http://localhost:3000/user/${userId}/addNewSet`, { setname, cards })
        .then(response => {
          if (response.status === 200) {
            history.push(`/user/${userId}`)
          }
        })
        .catch(err => {
          console.error(err)
          const { data } = err.response
          const { message } = data
          console.error(message)
        })
    }
  }
  return (
    <div>
      <h1>Create new Study Set</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="setname"
          placeholder="setname"
          name="setname"
          id="setname"
          color="primary"
          value={setname}
          onChange={(e) => handleChange(e)}
        />
        {cards.map(({text, flippedText}, index) => (
          index > 0 &&
          <><p>{`${index}`} Text: {`${text}`} Flipped Text: {`${flippedText}`}</p></>))}
              <FormControl>
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
          <Button onClick={addWord}>Add another word</Button>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Create Set!
            </Button>
              </div>
            </form>
    </div>
  )
}

export default SetForm
