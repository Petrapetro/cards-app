import React from 'react'
import { useParams } from 'react-router-dom'
import Gallery from './Gallery'

const LearnSet = () => {
  const { userid, setid } = useParams()

  return (
    <div>
      <Gallery userId={userid} cardSetId={setid} />
    </div>
  )
}

export default LearnSet