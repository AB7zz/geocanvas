import React from 'react'
import { useStateContext } from '../context/StateContext'
import GoogleButton from 'react-google-button'

const Login = () => {
  const { handleLogin, loginState } = useStateContext()
  return (
    <div className='flex flex-col justify-center px-20 py-20'>
      {loginState == 0 ? 
        <GoogleButton
          type="dark" // can be light or dark
          onClick={handleLogin}
        />
      : loginState == 1?
        <button>Loading...</button>
      :
      <></>
      }
    </div>
  )
}

export default Login