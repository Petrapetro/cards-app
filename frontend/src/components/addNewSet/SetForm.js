import {
  Button,
  FormControl,
  InputBase,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'

const SetForm = ({ userId }) => {
  const [cards, setCards] = useState([])
  const [setname, setSetname] = useState(null)
  const [text, setText] = useState(null)
  const [flippedText, setFlippedText] = useState(null)
  const [words, setWords] = useState([[]])

  const handleChangeSetname = (e) => {
    e.persist()
    setSetname({[e.target.name]: e.target.value})
  }
  const handleChangeText = (e) => {
    e.persist()
    setText({[e.target.name]: e.target.value})
  }

  const handleChangeFlippedText = (e) => {
    e.persist()
    setFlippedText({[e.target.name]: e.target.value})
  }

  const addWord = () => {
    if(text !== null && flippedText !== null) {
      setWords([... [text, flippedText]])
    }
  }

  const handleSubmit = () => {

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
            onChange={handleChangeSetname}
          />
          {words.map(() => (
          <FormControl>
          <TextField
            type="text"
            placeholder="text"
            name="text"
            id="text"
            color="primary"
            value={text}
            onChange={handleChangeText}
          />
          <TextField
            type="flippedText"
            placeholder="flippedText"
            name="flippedText"
            id="flippedText"
            color="primary"
            value={flippedText}
            onChange={handleChangeFlippedText}
          />
          </FormControl>
          ))}
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
