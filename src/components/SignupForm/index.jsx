import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.services'

import { MessageContext } from "../../contexts/userMessage.context"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { setShowMessage } = useContext(MessageContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => {
                setShowMessage({ show: true, title: `Welcome, ${data.user.username}`, text: 'Sign up successful' })
                navigate('/login')
            })
            .catch(err => {
                setShowMessage({ show: true, title: `Error :C`, text: 'Sign up was unsuccessful' })
                console.log(err)
            })
    }


    const { username, password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Register</Button>
            </div>

        </Form>
    )
}

export default SignupForm
