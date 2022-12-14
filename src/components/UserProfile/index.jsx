import { Container, Button } from 'react-bootstrap'
import UserProfileEditForm from "../UserProfileEditForm"
import { useState, useContext } from 'react'
import Loader from './../Loader'

import { AuthContext } from "../../contexts/auth.context";

import styled from 'styled-components'

const StyledAvatar = styled.figure`
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledAvatarImg = styled.img`
    width: 220px;
    height: 220px;
    align-self: end;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    object-fit: cover;
    border-radius: 50%;
`

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
                    <StyledAvatar className='avatar'>
                        <StyledAvatarImg src={userData.avatar} alt={`avatar of ${userData.username}`} />
                    </StyledAvatar>
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