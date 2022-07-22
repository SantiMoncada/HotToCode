import { createContext, useContext, useEffect, useState } from 'react'

import { AuthContext } from "./auth.context"

import userService from '../services/user.services'

const UserContext = createContext()

function UserProviderWrapper(props) {

    const { user } = useContext(AuthContext)

    const [favSnippets, setFavSnippets] = useState([])

    const getUserData = () => {
        if (user) {
            userService
                .getAllFavSnippets(user._id)
                .then(({ data }) => {
                    console.log(data)
                    setFavSnippets(data)
                })
                .catch(err => console.log(err))

        }
    }


    useEffect(() => {

        getUserData()
    }, [user])

    return (
        <UserContext.Provider value={favSnippets}>
            {props.children}
        </UserContext.Provider>
    )
}

export { AuthContext, UserProviderWrapper }