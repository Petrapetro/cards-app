import { Button } from '@material-ui/core'
import React from 'react'

const Sets = ({ sets }) => {
  return (
    <div>
      {sets.map(({ id, setname }, index) =>
        <div key={`${index}-set`}>
          {id}
          <Button>{setname}</Button>
        </div>)}
    </div>
  )
}

export default Sets