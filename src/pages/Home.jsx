import React from 'react'
import { useStateContext } from '../context/StateContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { setMapid, mapid } = useStateContext()
  return (
    <div className='p-5'>
      <input className='border-2 border-black' onChange={(e) => setMapid(e.target.value)} type="text" name="mapid" placeholder='Enter map name' id="" />
      <Link to={`/create/${mapid}`} className='bg-green-500 rounded px-3 py-1 text-white text-center'>Create</Link>
      <Link to={`/map`} className='bg-green-500 rounded px-3 py-1 text-white text-center'>Map</Link>
    </div>
  )
}

export default Home