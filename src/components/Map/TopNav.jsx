import React from 'react'
import gsap from 'gsap/gsap-core';
import './style.css'

const TopNav = () => {
  const searchBar = React.useRef(null)
  const [searchToggle, setSearchToggle] = React.useState(false)
  React.useEffect(() => {
    if(searchToggle){
      gsap.to(searchBar.current, { duration: 0.2, width: "80%", textAlign: 'initial', paddingLeft: '50px', borderRadius: '40px', fontSize: '20px', marginLeft: '10px', scaleX: '1' });
      searchBar.current.value = ''
      searchBar.current.placeholder = 'Search for a location...'
    }else{
      gsap.to(searchBar.current, { duration: 0.2, width: "60px", textAlign: 'initial', paddingLeft: '0px', borderRadius: '40px', fontSize: '20px', marginLeft: '10px', scaleX: '1' });
      searchBar.current.value = ''
      searchBar.current.placeholder = ''
    }
  }, [searchToggle])

  const handleCustom = () => {
    setSearchToggle(!searchToggle)
  }

  return (
    <div className='fixed z-20 px-5 top-[20px] w-screen'>
      <div className='flex justify-between'>
        <input
          onClick={handleCustom}
          ref={searchBar}
          className='inputBox hover:cursor-pointer rounded-[40px] w-[60px] text-4xl font-semibold text-center border border-2' 
        />
        <div className='bg-black rounded-[50%] px-4 py-3'>
          <i className="fa-solid fa-user text-3xl text-white"></i>
        </div>
      </div>  
    </div>
  )
}

export default TopNav