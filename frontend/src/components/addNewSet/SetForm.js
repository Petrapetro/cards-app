import {
  Button,
  FormControl,
  InputBase,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'

const SetForm = ({ userId }) => {
  const [cards, setCards] = useState([])
  const [setname, setSetname] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [flippedText, setFlippedText] = useState(undefined)
  const [words, setWords] = useState([[]])

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
      if(words[0] === []) {
        console.log({words})
        setWords({text, flippedText})
        setWords(words.shift())
      } else {
        setWords([...words, {text, flippedText}])
      }
      console.log({ words })
      setText('')
      setFlippedText('')
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
          onChange={(e) => handleChange(e)}
        />
        {words.map(({text, flippedText}, index) => (
          index > 0 && index !== words.length-1 &&
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
