import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const BotNav = () => {
    const [toggle, setToggle] = React.useState(false)

    React.useEffect(() => {
        const extensionDiv = document.querySelector('.extension');
        const plusIcon = document.querySelector('.fa-plus');
        gsap.to(extensionDiv, {
            height: toggle ? '150px' : '0px',
            duration: 0.5,
            ease: 'power2.inOut'
        });

        gsap.to(plusIcon, {
            rotation: toggle ? '135deg' : '0deg',
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }, [toggle])
    return (
        <>
            <div className='fixed bottom-[30px] right-[40%] z-20'>
                <div className='extension bg-purple-500 rounded-[50px] w-[64px] px-4 py-5'>
                    <div className='flex flex-col mb-10'>
                        <Link className='my-5' to='/create'>
                            <i className="fa-solid fa-image text-white text-4xl"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div onClick={() => setToggle(!toggle)} className='fixed bottom-[20px] right-[40%] z-20'>
                <div className='rounded-[50%] bg-purple-500 px-4 py-3'>
                    <i className="fa-solid fa-plus text-4xl text-white"></i>
                </div>
            </div>
        </>
    )
}

export default BotNav