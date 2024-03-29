import React from 'react'
import { useParams } from 'react-router-dom'

const Map = () => {
    const { mapid } = useParams()
  return (
    <div>{mapid}</div>
  )
}

export default Map