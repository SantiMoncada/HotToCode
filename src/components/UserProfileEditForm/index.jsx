import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import userService from "../../services/user.services"
import uploadService from '../../services/upload.services'
import { AuthContext } from "../../contexts/auth.context"

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
                //TODO close form
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
            .catch(err => console.error(err))
    }



    const { username, bio } = formData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Your name</Form.Label>
                <Form.Control type="text" value={username} onChange={handleChange} name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar (File)</Form.Label>
                <Form.Control type="file" onChange={handleFileInput} name="avatar" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} value={bio} onChange={handleChange} name="bio" />
            </Form.Group>
            <div className="d-grid">
                {!isLoading ? <Button variant="dark" type="submit">Edit</Button> : <p>Loading...</p>}
                <Button variant="primary" onClick={formOpenHandler} >Cancel</Button>
            </div>
        </Form>
    )
}

export default UserProfileEditForm