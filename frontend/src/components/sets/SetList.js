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
import { useHistory } from 'react-router-dom'

const SetList = ({ userId }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      paddingLeft: "1.5em",
    },
  });

  const classes = useStyles();
  const history = useHistory()

  const [studySets, setStudySets] = useState(null)
  const [setName, setSetName] = useState(null)
  const [cardSet, setCardSet] = useState(undefined)

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
      return () => {}
  }, [])

  const openSet = (userId, setId, setname) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response, setname)
          const { data } = response
          const { cards } = data
          setSetName(setname)
          setCardSet(cards) 
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const learnSet = (userId, setId, setname) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          setCardSet(cards)
          setSetName(setname)
          console.log({ cardSet })
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  const editSet = () => {

  }

  const deleteSet = (userId, setId) => {
    axios.delete(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        const { data } = response
        const { message } = data
        console.log({ message })
        history.push(`/user/${userId}`)
      })
      .catch(err => {
        console.log({ err })
      })
  }
  console.log({ setName, studySets, cardSet })
  return (
    <div>
      {setName === undefined ?
        <h1 style={{ marginTop: 0 }}>Your Sets</h1>
        :
        <h1 style={{ marginTop: 0 }}>{setName}</h1>
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
                  <TableCell>Flipped Text</TableCell>
                  <TableCell>Edit</TableCell></>
              }
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardSet === undefined && studySets !== null &&
              studySets.map(({ id, setname }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    <Button onClick={() => openSet(userId, id, setname)}>{setname}</Button>
                  </TableCell>
                  <TableCell align="right">
                    <NavLink to={`/user/${userId}/set/${id}/learn`} onClick={() => learnSet(userId, id, setname)}>Learn {setname}</NavLink>
                  </TableCell>
                  <TableCell align="right">
                    <NavLink to={`/user/${userId}/set/${id}/delete`} onClick={() => deleteSet(userId, id)}>Delete</NavLink>
                  </TableCell>
                </TableRow>
              ))}
            {cardSet !== undefined &&
              cardSet.map(({ text, flippedText }, index) => (
                <TableRow key={index}>
                  <TableCell>{text}</TableCell>
                  <TableCell>{flippedText}</TableCell>
                  <TableCell>edit</TableCell>
                  <TableCell align="right">delete</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SetList