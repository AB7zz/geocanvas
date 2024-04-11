import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ImageUpload from './ImageUpload'

const BotNav = () => {
    const [toggle, setToggle] = React.useState(false)
    const [imageToggle, setImageToggle] = React.useState(false)

    React.useEffect(() => {
        const extensionDiv = document.querySelector('.extension');
        const plusIcon = document.querySelector('.bot-fa-plus');
        gsap.to(extensionDiv, {
            height: toggle ? '250px' : '0px',
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

    const handleCapture = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
    
        input.onchange = (event) => {
          const file = event.target.files[0];
          const src = URL.createObjectURL(file);
          setImageSrc(src);
        };
    
        input.click();
    };

    return (
        <>
            <ImageUpload setImageToggle={setImageToggle} />
            <div className='fixed bottom-[30px] right-[40%] z-20'>
                <div className='extension bg-purple-500 rounded-[50px] height-[0px] w-[64px] px-4 py-5'>
                    {
                        toggle && 
                        <div className='flex flex-col mb-10'>
                            <div onClick={() => setImageToggle(true)} className='my-5' to='/create'>
                                <i className="fa-solid fa-image text-white text-4xl"></i>
                            </div>
                            <div onClick={handleCapture} className='my-5' to='/create'>
                                <i className="fa-solid fa-camera text-white text-4xl"></i>
                            </div>
                        </div>
                    }
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