import React from 'react'
import { useStateContext } from '../../context/StateContext'
import { useNavigate } from 'react-router-dom'

const ImageDisplay = ({ src, index, setSelectedFiles, selectedFiles }) => {
    const handleDelete = () => {
        console.log(index)
        const updatedFiles = [...selectedFiles.slice(0, index), ...selectedFiles.slice(index + 1)];
        setSelectedFiles(updatedFiles);
    }
    return (
        <>
            <div key={index} >
                <div onClick={handleDelete} className='absolute'>
                    <i className="fa-solid fa-trash text-2xl text-red-500"></i>
                </div>
                <img src={src} alt="" className='rounded-[10px] w-[100px] h-[100px] object-cover' />
            </div>
        </>
    )
}

const ImageUpload = ({ setImageToggle }) => {
    const { searchLoc, uploadImage } = useStateContext()
    const [location, setLocation] = React.useState('')
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const newFiles = event.target.files;
        const updatedFiles = [...selectedFiles, ...Array.from(newFiles)];
        setSelectedFiles(updatedFiles);
    };
    
    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleUploadImage = () => {
        const res = uploadImage(location, selectedFiles)
        if (res){
            navigate('/map', { replace: true })
        }
    }

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
                                <input onChange={e => setLocation(e.target.value)} type="text" name="" defaultValue={searchLoc} className='my-2 bg-gray-100 rounded-[10px] pl-2 py-2 my-5 w-[70%]' id="1" />
                            </div>
                            <div className='my-5'>
                                <h3 className='text-xl mr-3'>Select Images:</h3>
                                {selectedFiles.length > 0 ?
                                    <div className='bg-gray-100 rounded-[20px] w-[95%] h-full p-5 my-2'>
                                        <div className='grid grid-cols-3 gap-5'>
                                            {selectedFiles.map((file, index) => (
                                                <ImageDisplay src={URL.createObjectURL(file)} index={index} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
                                            ))}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            multiple
                                            className='hidden'
                                        />
                                        <div onClick={handleDivClick} className='flex justify-center mt-5'>
                                            <button className='m-auto bg-blue-500 px-4 py-1 text-white rounded items-center flex font-semibold'><span className='text-2xl mr-3'>+</span> Upload more</button>
                                        </div>
                                    </div>
                                :
                                    <div onClick={handleDivClick} className='flex justify-center my-2 bg-gray-100 rounded-[20px] w-[95%] h-[250px]'>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            multiple
                                            className='hidden'
                                        />
                                        <i className="m-auto fa-solid fa-plus text-5xl text-gray-400"></i>
                                    </div>
                                }
                            </div>
                            <button onClick={handleUploadImage} className='m-auto p-3 bg-green-500 text-white rounded text-center w-[50%]'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload