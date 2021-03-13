import React from 'react'

const Sets = ({sets}) => {
  return (
    <div>
      <h1>Sets</h1>
      {sets.map(({ id, setname }, index) =>
      <p key={`${index}-set`}>{id}{setname}</p>)}
    </div>
  )
}

export default Sets