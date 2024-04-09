import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex flex-col justify-center px-20 py-20'>
        <input type="email" name="" placeholder='Enter email' className='bg-gray-100 rounded pl-2 py-2 my-5' id="1" />
        <input type="text" name="" placeholder='Enter username' className='bg-gray-100 rounded pl-2 py-2 my-5' id="2" />
        <input type="password" name="" placeholder='Enter password' className='bg-gray-100 rounded pl-2 py-2 mt-5 mb-1' id="3" />
        <p>Already have an account? <Link to='/login' className="text-blue-500 font-semibold">Log in</Link></p>
        <button className='bg-green-400 text-white rounded text-center font-bold py-2 w-[80%] m-auto my-10'>Sign up</button>
    </div>
  )
}

export default Signup