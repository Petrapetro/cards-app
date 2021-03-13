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
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const SetList = ({ userId, sets }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      paddingLeft: "1.5em",
    },
  });

  const classes = useStyles();

  const [cards, setCards] = useState(null)
  const [setName, setSetName] = useState(null)

  const openSet = (userId, id, setname) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${id}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          setCards(cards)
          setSetName(setname)
          console.log({ cards })
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  return (
    <div>
      {setName === null ?
      <h1 style={{ marginTop: 0 }}>Your Sets</h1>
      :
      <h1 style={{ marginTop: 0 }}>{setName}</h1>
      }
  
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {cards === null &&
              <TableCell>Title</TableCell>
              }
              {cards !== null &&
              <><TableCell>Text</TableCell>
              <TableCell>Flipped Text</TableCell></>
              }
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards === null &&
            sets.map(({ id, setname }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <NavLink to={`/user/${userId}/set/${id}`} onClick={() => openSet(userId, id, setname)}>{setname}</NavLink>
                </TableCell>
                <TableCell align="right">edit</TableCell>
                <TableCell align="right">delete</TableCell>
              </TableRow>
            ))}
            {cards !== null &&
            cards.map(({text, flippedText}, index) => (
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
{/*       <Switch>
        {sets.map(({ id }) => ())}
      </Switch> */}
    </div>
  )
}

export default SetList