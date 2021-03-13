import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Sets = ({ sets }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Set id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map(({ id, setname }, index) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell component="th" scope="row">
                {setname}
              </TableCell>
              <TableCell align="right">edit</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Sets