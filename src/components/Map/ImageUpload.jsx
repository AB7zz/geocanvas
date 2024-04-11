import React from 'react'

const ImageUpload = ({ setImageToggle }) => {
    return (
        <div className='imageupload fixed z-30 left-[0%] top-0'>
            <div className='bg-white w-screen h-screen'>
                <div className='flex justify-between px-5 py-5'>
                    <div onClick={() => setImageToggle(false)} className=''>
                        <i className="fa-solid fa-x text-4xl"></i>
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
                                    <i className="m-auto fa-solid fa-plus text-5xl text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload