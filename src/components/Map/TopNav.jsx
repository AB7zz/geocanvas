import React from 'react'
import gsap from 'gsap/gsap-core';
import './style.css'
import Profile from './Profile';
import cities from 'cities.json'
import { useStateContext } from '../../context/StateContext';

const TopNav = () => {
  const { setSearchLoc } = useStateContext()
  const searchBar = React.useRef(null)
  const [searchToggle, setSearchToggle] = React.useState(false)
  const [profileToggle, setProfileToggle] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState([])
  React.useEffect(() => {
    if(searchToggle){
      gsap.to(searchBar.current, { duration: 0.2, width: "80%", textAlign: 'initial', paddingLeft: '50px', borderRadius: '40px', fontSize: '20px', marginLeft: '10px', scaleX: '1' });
      searchBar.current.value = ''
      searchBar.current.readOnly = false
      searchBar.current.placeholder = 'Search for a location...'
    }else{
      gsap.to('.suggestions', { duration: 0.2, width: '0px', height: '0px' })
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

  const handleChange = (e) => {
    setSearchLoc(e.target.value)
    if(e.target.value.length < 1){
      setSuggestions(null)
      gsap.to('.suggestions', { duration: 0.2, height: '0px', width: '0px' })
    }else{
      gsap.to('.suggestions', { duration: 0.2, height: '250px', width: '290px' })
    }
    setSuggestions(cities.filter(city => city.name.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 2))
  }

  return (
    <>
      <Profile setProfileToggle={setProfileToggle} />
      <div className='fixed z-20 px-3 top-[20px] w-screen'>
        <div className='flex justify-between'>
          <input
            onClick={() => setSearchToggle(!searchToggle)}
            onChange={handleChange}
            ref={searchBar}
            readOnly
            className='inputBox hover:cursor-pointer rounded-[40px] w-[60px] text-4xl font-semibold text-center border-none outline-none z-20' 
          />
          <div className='absolute left-[23px] top-[0px] z-10'>
            <div className='suggestions bg-white rounded-[40px] w-[290px] h-0'>
              <div className='flex flex-col absolute top-[80px] left-[20px]'>
                {
                  suggestions.map((suggestion, i) => (
                    <div key={i} className='p-2'>
                      <p className='text-black font-semibold text-lg my-1'>{suggestion.name}</p>
                      <hr className='mt-5' />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
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