import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const SetList = ({ userId, cardSetId, setCardSetId, name, setName, cardSet, setCardSet }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      paddingLeft: "1.5em",
    },
  });

  const classes = useStyles();

  const [studySets, setStudySets] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}`)
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
    axios.get(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          setName(setname)
          setCardSet(cards)
          setCardSetId(setId)
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const learnSet = (setId, setname) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          setCardSet(cards)
          setName(setname)
          console.log({ cardSet })
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const deleteSet = (setId) => {
    axios.delete(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        const { data } = response
        const { message } = data
        console.log({ message })
        window.location.reload()
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const deleteCard = (cardId) => {
    axios.delete(`http://localhost:3000/user/${userId}/set/${cardSetId}/card/${cardId}`)
      .then(response => {
        const { data } = response
        const { message } = data
        console.log({ message })
      })
      .catch(err => {
        console.log({ err })
      })
    openSet(cardSetId, name)
  }

  return (
    <div>
      {name === undefined ?
        <h1 style={{ marginTop: 0 }}>Your Sets</h1>
        :
        <h1 style={{ marginTop: 0 }}>{name}</h1>
      }

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cardSet === undefined &&
                <><TableCell>Title</TableCell>
                  <TableCell align="right">Learn</TableCell></>
              }
              {cardSet !== undefined &&
                <><TableCell>Text</TableCell>
                  <TableCell>Flipped Text</TableCell></>
              }
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardSet === undefined && studySets !== null &&
              studySets.map(({ id, setname }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    <Button onClick={() => openSet(id, setname)}>{setname}</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => learnSet(id, setname)}>Learn {setname}</Button>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/user/${userId}/set/${id}/edit`} onClick={() => { setCardSetId(id); console.log({cardSetId, name})}}>Edit</NavLink>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteSet(id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            {cardSet !== undefined &&
              cardSet.map(({ text, flippedText, id }) => (
                <TableRow key={id}>
                  <TableCell>{text}</TableCell>
                  <TableCell>{flippedText}</TableCell>
                  <TableCell>edit</TableCell>
                  <TableCell>
                    <Button onClick={() => deleteCard(id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SetList