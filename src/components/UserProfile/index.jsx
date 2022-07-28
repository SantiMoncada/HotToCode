import { Container, Button } from 'react-bootstrap'
import UserProfileEditForm from "../UserProfileEditForm"
import { useState, useContext } from 'react'
import './userprofile.css'
import Loader from './../Loader'

import { AuthContext } from "../../contexts/auth.context";

const UserProfile = ({ loadUser, userData }) => {

    const { user } = useContext(AuthContext)

    const [formOpen, setFormOpen] = useState(false)

    const formOpenHandler = () => {
        setFormOpen(state => !state)
    }

    let editBuntton = <></>

    if (userData && user) {
        if (userData._id === user._id) {
            editBuntton = <>
                <div className="d-grid ">
                    <Button variant="outline-secondary" onClick={formOpenHandler} >Edit</Button>
                </div>
            </>
        }
    }

    return (
        <>
            {userData ?
                <Container>
                    <figure className='avatar'>
                        <img src={userData.avatar} alt={`avatar of ${userData.username}`} />
                    </figure>
                    {!formOpen ?
                        <>
                            <h3>@{userData.username}</h3>
                            <p>{userData.bio}</p>

                            {editBuntton}

                        </>
                        :
                        <UserProfileEditForm formOpenHandler={formOpenHandler} loadUser={loadUser} userData={userData} />
                    }
                    <br />
                </Container>
                :
                <Loader />
            }

        </>
    )

}

export default UserProfile