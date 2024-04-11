import React from 'react'
import gsap from 'gsap/gsap-core';
import './style.css'
import Profile from './Profile';

const TopNav = () => {
  const searchBar = React.useRef(null)
  const [searchToggle, setSearchToggle] = React.useState(false)
  const [profileToggle, setProfileToggle] = React.useState(false)
  React.useEffect(() => {
    if(searchToggle){
      gsap.to(searchBar.current, { duration: 0.2, width: "80%", textAlign: 'initial', paddingLeft: '50px', borderRadius: '40px', fontSize: '20px', marginLeft: '10px', scaleX: '1' });
      searchBar.current.value = ''
      searchBar.current.readOnly = false
      searchBar.current.placeholder = 'Search for a location...'
    }else{
      gsap.to(searchBar.current, { duration: 0.2, width: "60px", textAlign: 'initial', paddingLeft: '0px', borderRadius: '40px', fontSize: '20px', marginLeft: '10px', scaleX: '1' });
      searchBar.current.value = ''
      searchBar.current.readOnly = true
      searchBar.current.placeholder = ''
    }
  }, [searchToggle])

  React.useEffect(() => {
    if(profileToggle){
      gsap.to('.profilepage', { duration: 0.2, left: '0%' });
    }else{
      gsap.to('.profilepage', { duration: 0.2, left: '100%' });
    }
  }, [profileToggle])

  return (
    <>
      <Profile setProfileToggle={setProfileToggle} />
      <div className='fixed z-20 px-3 top-[20px] w-screen'>
        <div className='flex justify-between'>
          <input
            onClick={() => setSearchToggle(!searchToggle)}
            ref={searchBar}
            readOnly
            className='inputBox hover:cursor-pointer rounded-[40px] w-[60px] text-4xl font-semibold text-center border border-2' 
          />
          <div
          onClick={() => setProfileToggle(true)}
          className='bg-black rounded-[50%] px-4 py-3'>
            <i className="fa-solid fa-user text-3xl text-white"></i>
          </div>
        </div>  
      </div>
    </>
  )
}

export default TopNav