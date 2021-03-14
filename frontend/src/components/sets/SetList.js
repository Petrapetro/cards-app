import {
  makeStyles,
  Switch,
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

const SetList = ({ userId }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      paddingLeft: "1.5em",
    },
  });

  const classes = useStyles();

  const [cardSet, setCardSet] = useState(undefined)
  const [sets, setSets] = useState(null)
  const [setName, setSetName] = useState(null)
  const [learnMode, setLearnMode] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { sets } = data
          setSets(sets)
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])

  const openSet = (userId, setId, setname) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${setId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          console.log({cards})
          setCardSet({cards})
          setSetName(setname)
          console.log({ cardSet })
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

  const deleteSet = () => {

  }

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
              <TableCell>Flipped Text</TableCell></>
              }
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardSet === undefined && sets !== null &&
            sets.map(({ id, setname }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <NavLink to={`/user/${userId}/set/${id}`} onClick={() => openSet(userId, id, setname)}>{setname}</NavLink>
                </TableCell>
                <TableCell align="right">
                <NavLink to={`/user/${userId}/set/${id}/learn`} onClick={() => learnSet(userId, id, setname)}>Learn {setname}</NavLink>
                </TableCell>
                <TableCell align="right">
                <NavLink to={`/user/${userId}/set/${id}/edit`} onClick={() => editSet(userId, id, setname)}>Edit</NavLink>
                </TableCell>
                <TableCell align="right">
                <NavLink to={`/user/${userId}/set/${id}/delete`} onClick={() => deleteSet(userId, id, setname)}>Delete</NavLink>
                </TableCell>
              </TableRow>
            ))}
            {cardSet !== undefined &&
            cardSet.map(({text, flippedText}, index) => (
              <TableRow key={index}>
                <TableCell>{text}</TableCell>
                <TableCell>{flippedText}</TableCell>
                <TableCell align="right">edit</TableCell>
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