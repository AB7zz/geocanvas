import React from 'react'

const StateContext = React.createContext()

export const StateContextProvider = ({ children }) => {

    return (
        <StateContext.Provider value={{
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)