import React from 'react'
import { useStateContext } from '../context/StateContext'
import { useNavigate } from 'react-router-dom'

const Username = () => {
    const { handleCreateUsername, fetchPersonalDetails, profileDetails } = useStateContext()
    const [username, setUsername] = React.useState('')
    const navigate = useNavigate()
    React.useEffect(() => {
        if(localStorage.getItem('login') != 'true'){
          window.location.replace('/login')
        }
        const res = fetchPersonalDetails()
        if(!res){
            navigate('/login', { replace: true })
        }
    }, [])
    React.useEffect(() => {
        console.log(profileDetails)
    }, [profileDetails])
    return (
        <div>
            <input className='border-2 border-black' onChange={(e) => setUsername(e.target.value)} type="text" name="mapid" placeholder='Enter map name' id="" />
            {profileDetails && <button onClick={() => handleCreateUsername(username)} className='bg-green-500 rounded px-3 py-1 text-white text-center'>Create</button>}
        </div>
    )
}

export default Username