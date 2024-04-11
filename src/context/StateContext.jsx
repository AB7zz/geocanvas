import React from 'react'

const StateContext = React.createContext()

export const StateContextProvider = ({ children }) => {
    const [mapid, setMapid] = React.useState('')
    const [imageData, setImageData] = React.useState([
        {
          position: [51.505, -0.09],
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT301-O44d0zGakxaUb_Z5leHAtWRQddBpgkWPuqE2Oyw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQka_16bh1cyRU3QvjdKELYHLDB9aRw_AI5XYRURbebmNKtIeyLDpcQ5yw_wpBCaI_PVeU&usqp=CAU"
          ]
        },
        {
          position: [52.505, -0.09],
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT301-O44d0zGakxaUb_Z5leHAtWRQddBpgkWPuqE2Oyw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQka_16bh1cyRU3QvjdKELYHLDB9aRw_AI5XYRURbebmNKtIeyLDpcQ5yw_wpBCaI_PVeU&usqp=CAU"
          ]
        }
    ])

    return (
        <StateContext.Provider value={{
            setMapid,
            setImageData,
            mapid,
            imageData
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)