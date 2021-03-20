import {
  Button,
  FormControl,
  TextField
} from '@material-ui/core'
import React, { useState, } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import './styles.css'

const SetForm = () => {
  const [cards, setCards] = useState([{}])
  const [setname, setSetname] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [flippedText, setFlippedText] = useState(undefined)
  const history = useHistory()
  let { userid } = useParams();

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
      console.log(cards[0])
      if (cards[0] === {}) {
        console.log({ cards })
        setCards({ text, flippedText })
        console.log({ cards })
      } else {
        setCards([...cards, { text, flippedText }])
      }
      console.log({ cards })
      setText('')
      setFlippedText('')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (setname) {
      const inputs = { setname, cards }
      axios.post(`http://localhost:3000/user/${userid}/addNewSet`, inputs)
        .then(response => {
          if (response.status === 200) {
            history.push(`/user/${userid}`)
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
    <div className="setForm-wrapper">
      <h1>Create new Study Set</h1>
      <form onSubmit={handleSubmit}>
        <h2>Set title: </h2>
        <TextField
          type="setname"
          placeholder="setname"
          name="setname"
          id="setname"
          color="primary"
          value={setname}
          onChange={(e) => handleChange(e)}
        />
        {cards.map(({ text, flippedText }, index) => (
          index > 0 &&
          <><div className="card-title">Card {index}: </div>
            <div className="card-text">{text}</div>
            <div className="card-text">{flippedText}</div></>))}
        <div className="card-add">
        <FormControl>
          <div className="card-title">Card {cards.length} (pending): </div>
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
        </div>
        <div className="buttons">
          <Button
            onClick={addWord}
            variant="contained"
            color="secondary">
            Finalize peding card & Add another
            </Button>
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
