import { useState } from "react"
import userService from "../../services/user.services"
import { Form, Button } from "react-bootstrap"

const UserProfileForm = () => {

    const [userData, setUserData] = useState({
        username: '',
        avatar: '',
        bio: ''
    })

    const handleChange = e => {
        const { value, name } = e.target
        setUserProfileData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault(

            userService
                .editUser(userData)
                .then((response) => {
                    console.log(response)
                })
                .catch(err => console.log(err))
        )
    }

    const { username, avatar, bio } = userData
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Tu nombre</Form.Label>
                <Form.Control type="text" value={username} onChange={handleChange} name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Content">
                <Form.Label>Avatar</Form.Label>
                <Form.Control as="textarea" rows={3} value={avatar} onChange={handleChange} name="avatar" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="language">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" value={bio} onChange={handleChange} name="bio" />
            </Form.Group>
            <div className="d-grid">
                <Button variant="dark" type="submit">Edit</Button>
            </div>
        </Form>
    )
}

export default UserProfileForm