import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import userService from "../../services/user.services"
import uploadService from '../../services/upload.services'
import { AuthContext } from "../../contexts/auth.context"

import Spinner from 'react-bootstrap/Spinner';

const UserProfileEditForm = ({ userData, loadUser, formOpenHandler }) => {
    const { user: loggedUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState(userData)

    const handleChange = e => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .editUser(loggedUser._id, formData)
            .then((response) => {
                formOpenHandler()
                loadUser()
            })
            .catch(err => console.log(err))

    }

    const handleFileInput = e => {
        setIsLoading(true)

        const imageFormData = new FormData()
        imageFormData.append('imageData', e.target.files[0])

        uploadService
            .uploadimage(imageFormData)
            .then(({ data }) => {
                setFormData({ ...formData, avatar: data.cloudinary_url })
                setIsLoading(false)
            })
            .catch(err => {
                //TODO alert user
                setIsLoading(false)
                console.error(err)
            })
    }



    const { username, bio } = formData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label><h4>Name</h4></Form.Label>
                <Form.Control type="text" value={username} onChange={handleChange} name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label><h4>Avatar (File)</h4></Form.Label>
                <Form.Control type="file" onChange={handleFileInput} name="avatar" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
                <Form.Label><h4>Bio</h4></Form.Label>
                <Form.Control as="textarea" rows={3} value={bio} onChange={handleChange} name="bio" />
            </Form.Group>
            <div className="d-grid gap-3">
                {!isLoading ?
                    <Button variant="success" type="submit">Submit</Button>
                    :
                    <Button variant="warning" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                }
                <Button variant="outline-secondary" onClick={formOpenHandler} >Cancel</Button>
            </div>
        </Form>
    )
}

export default UserProfileEditForm