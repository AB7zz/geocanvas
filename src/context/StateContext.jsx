import React from 'react'

const StateContext = React.createContext()

export const StateContextProvider = ({ children }) => {

    const [mapid, setMapid] = React.useState('mapid')

    return (
        <StateContext.Provider value={{
            mapid,
            setMapid
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)