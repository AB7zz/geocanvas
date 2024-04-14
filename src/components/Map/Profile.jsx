import React from 'react'
import { useStateContext } from '../../context/StateContext'
import { useNavigate } from 'react-router-dom'

const Profile = ({ setProfileToggle }) => {
    const { profileDetails, Logout } = useStateContext()
    const navigate = useNavigate()
    const handleLogout = () => {
        const res = Logout()
        if(res){
            navigate('/login')
        }
    }
    return (
        <div className='profilepage fixed z-30 left-[100%]'>
            <div className='bg-white w-screen h-screen'>
                <div className='flex justify-between px-5 py-5'>
                    <div onClick={() => setProfileToggle(false)} className=''>
                        <i className="fa-solid fa-x text-3xl"></i>
                    </div>
                </div>
                <div className='flex flex-col justify-center my-10'>
                    <i className="m-auto fa-solid fa-user text-6xl"></i>
                    <h3 className='text-center my-3 font-bold text-xl'>{profileDetails && profileDetails.displayName}</h3>

                    <div className='pl-5'>
                        <div className='flex items-center'>
                            <h3 className='text-xl mr-3'>Email:</h3>
                            <input type="email" name="" defaultValue={profileDetails && profileDetails.email} className='bg-gray-100 rounded pl-2 py-2 my-5 w-[70%]' id="1" />
                        </div>
                    </div>
                </div>
                <div onClick={handleLogout} className='flex justify-center'>
                    <button className='text-white bg-red-500 px-5 py-2 rounded'>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile