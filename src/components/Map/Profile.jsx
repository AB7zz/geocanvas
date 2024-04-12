import React from 'react'
import { useStateContext } from '../../context/StateContext'

const Profile = ({ setProfileToggle }) => {
    const { userDetails } = useStateContext()
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
                    <h3 className='text-center my-3 font-bold text-xl'>{userDetails && userDetails.displayName}</h3>

                    <div className='pl-5'>
                        <div className='flex items-center'>
                            <h3 className='text-xl mr-3'>Email:</h3>
                            <input type="email" name="" defaultValue={userDetails && userDetails.email} className='bg-gray-100 rounded pl-2 py-2 my-5 w-[70%]' id="1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile