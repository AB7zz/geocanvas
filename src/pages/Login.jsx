import React from 'react'
import { useStateContext } from '../context/StateContext'
import GoogleButton from 'react-google-button'

const Login = () => {
  const { userDetails } = useStateContext()
  React.useEffect(() => {
    if(localStorage.getItem('login') == 'true' && localStorage.getItem('username')){
      window.location.replace('/map')
    }
  }, [])
  const { handleLogin, loginState } = useStateContext()
  return (
    <div className='flex flex-col justify-center px-20 py-20'>
      {loginState == 0 ? 
        <GoogleButton
          type="dark" // can be light or dark
          onClick={handleLogin}
        />
      : loginState == 1?
        <button className='bg-[#4285F4] text-white min-[320px]:w-[240px] min-[320px]:h-[50px] font-semibold'>Loading...</button>
      :
      <></>
      }
    </div>
  )
}

export default Login