import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const BotNav = () => {
    const [toggle, setToggle] = React.useState(false)
    const [imageToggle, setImageToggle] = React.useState(false)

    React.useEffect(() => {
        const extensionDiv = document.querySelector('.extension');
        const plusIcon = document.querySelector('.bot-fa-plus');
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

    React.useEffect(() => {
        if(imageToggle){
            gsap.to('.imageupload', { duration: 0.2, left: '0%' });
        }else{
            gsap.to('.imageupload', { duration: 0.2, left: '100%' });
        }
    }, [imageToggle])
    return (
        <>
            <div className='imageupload fixed z-30 left-[0%] top-0'>
                <div className='bg-white w-screen h-screen'>
                    <div className='flex justify-between px-5 py-5'>
                        <div onClick={() => setImageToggle(false)} className=''>
                            <i class="fa-solid fa-x text-4xl"></i>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center my-10'>
                        <i className="m-auto fa-solid fa-image text-6xl"></i>
                        <h3 className='text-center my-3 font-bold text-xl'>Upload Images</h3>

                        <div className='pl-5'>
                            <div className='flex flex-col'>
                                <div className='my-5'>
                                    <h3 className='text-xl mr-3'>Select Location:</h3>
                                    <input type="text" name="" defaultValue="Longon, UK" className='my-2 bg-gray-100 rounded-[10px] pl-2 py-2 my-5 w-[70%]' id="1" />
                                </div>
                                <div className='my-5'>
                                    <h3 className='text-xl mr-3'>Select Images:</h3>
                                    <div className='flex justify-center my-2 bg-gray-100 rounded-[20px] w-[95%] h-[250px]'>
                                        <i class="m-auto fa-solid fa-plus text-5xl text-gray-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed bottom-[30px] right-[40%] z-20'>
                <div className='extension bg-purple-500 rounded-[50px] height-[0px] w-[64px] px-4 py-5'>
                    {toggle && <div className='flex flex-col mb-10'>
                        <div onClick={() => setImageToggle(true)} className='my-5' to='/create'>
                            <i className="fa-solid fa-image text-white text-4xl"></i>
                        </div>
                    </div>}
                </div>
            </div>
            <div onClick={() => setToggle(!toggle)} className='fixed bottom-[20px] right-[40%] z-20'>
                <div className='rounded-[50%] bg-purple-500 px-4 py-3'>
                    <i className="fa-solid bot-fa-plus fa-plus text-4xl text-white"></i>
                </div>
            </div>
        </>
    )
}

export default BotNav