// import { useContext, useState } from "react"
// import { Form, Button } from "react-bootstrap"
// import { AuthContext } from "../../contexts/auth.context"
// import commentService from "../../services/commets.services"


// const CommentForm = ({ title, content }) => {

//     const { user: loggedUser } = useContext(AuthContext)

//     const [commentData, setCommentData] = useState(commentData)

//     const handleChange = e => {
//         const { value, name } = e.target
//         setCommentData({ ...commentData, [name]: value })
//     }

//     const handleSubmit = e => {
//         e.preventDefault()

//         commentService
//             .createComment(loggedUser._id, commentData)
//             .then((response) => {
//                 console.log(response)
//             })
//             .catch(err => console.log(err))

//     }


//     return (

//         <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="content">
//                 <Form.Label>{title}</Form.Label>
//                 <Form.Control as="textarea" rows={3} value={content} onChange={handleChange} name="content" />
//             </Form.Group>
//             <Button variant="dark" type="submit">Submit</Button>
//         </Form>
//     )
// }

// export default CommentForm