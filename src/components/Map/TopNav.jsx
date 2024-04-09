import React from 'react'
import gsap from 'gsap/gsap-core';
import './style.css'

const TopNav = () => {
  const searchBar = React.useRef(null)
  const [searchToggle, setSearchToggle] = React.useState(false)
  const [profileToggle, setProfileToggle] = React.useState(false)
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

  React.useEffect(() => {
    if(profileToggle){
      gsap.to('.profilepage', { duration: 0.2, left: '0%' });
    }else{
      gsap.to('.profilepage', { duration: 0.2, left: '100%' });
    }
  }, [profileToggle])

  return (
    <>
      <div className='profilepage fixed z-30 left-[100%]'>
        <div className='bg-white w-screen h-screen'>
          <div className='flex justify-between px-5 py-5'>
            <div onClick={() => setProfileToggle(false)} className=''>
              <i class="fa-solid fa-x text-4xl"></i>
            </div>
          </div>
          <div className='flex flex-col justify-center my-10'>
            <i className="m-auto fa-solid fa-user text-6xl"></i>
            <h3 className='text-center my-3 font-bold text-xl'>AB7zz</h3>

            <div className='pl-5'>
              <div className='flex items-center'>
                <h3 className='text-xl mr-3'>Email:</h3>
                <input type="email" name="" defaultValue="abhinavcv007@gmail.com" className='bg-gray-100 rounded pl-2 py-2 my-5 w-[70%]' id="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed z-20 px-3 top-[20px] w-screen'>
        <div className='flex justify-between'>
          <input
            onClick={() => setSearchToggle(!searchToggle)}
            ref={searchBar}
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