const CardList = ({ userId, setId, cards }) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      paddingLeft: "1.5em",
    },
  });

  const [cards, setCards] = useState([])

  const classes = useStyles();

  const openSet = (userId, id) => {
    axios.get(`http://localhost:3000/user/${userId}/set/${id}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { cards } = data
          setCards(cards)
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Your Sets</h1>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Flipped Text</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(({ id, text, flippedText }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">{text}</TableCell>
                <TableCell component="th" scope="row">{flippedText}</TableCell>
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

export default CardList