import React from 'react'

const StateContext = React.createContext()

export const StateContextProvider = ({ children }) => {
    const [mapid, setMapid] = React.useState('')
    return (
        <StateContext.Provider value={{
            setMapid,
            mapid
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)