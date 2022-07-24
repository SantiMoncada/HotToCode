import { createContext, useContext, useEffect, useState } from 'react'

import { AuthContext } from "./auth.context"

import userService from '../services/user.services'

const UserContext = createContext()

function UserProviderWrapper(props) {

    const { user } = useContext(AuthContext)

    const [favSnippets, setFavSnippets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const UpdateUserData = () => {
        setIsLoading(true)
        if (user) {
            userService
                .getAllFavSnippets(user._id)
                .then(({ data }) => {
                    setIsLoading(false)
                    setFavSnippets(data.favSnippets)
                })
                .catch(err => console.log(err))

        }
    }

    useEffect(() => {
        UpdateUserData()
    }, [user])

    return (
        <UserContext.Provider value={{ favSnippets, UpdateUserData, isLoading }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProviderWrapper }