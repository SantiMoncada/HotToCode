import commentService from './../../services/commets.services'

import { AuthContext } from '../../contexts/auth.context'
import { useContext,useState } from "react"

import { Card, Row, Col } from "react-bootstrap"

import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md'

import './CommentItem.css'
import styled from 'styled-components'


const StyledCommentAvatar = styled.div`
    padding: 0;
    padding-left: 10px;
    display: flex;
    margin-top: 10px;
    justify-content: end;

    img{
        width: 50px;
        height: 50px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        object-fit: cover;
        border-radius: 50%;
    }
`


const StyledCommentIemCard = styled(Card)`
    padding: 0;
    padding-left: 10px;
    display: flex;
    margin-top: 10px;
    justify-content: end;
    padding: 5px 10px 30px 10px;
`

const CommentItem = ({ owner, content, _id, fireFinalActions }) => {

    const { user } = useContext(AuthContext)
    const [isDeleting,setIsDeleting] = useState(false)

    const commentDelete = () => {
        if(isDeleting){
            return
        }

        setIsDeleting(true)
        commentService
            .deleteComment(_id)
            .then(() => {
                if (fireFinalActions) {
                    fireFinalActions()
                }
                
            })
            .catch(err => {
                console.log(err)
                setIsDeleting(false)
            })
    }

    return (
        <StyledCommentIemCard >
            <Row>
                <Col xs={2} sm={1} >
                    <StyledCommentAvatar>
                        <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} />
                    </StyledCommentAvatar>
                </Col>
                <Col xs={8} sm={10}>
                    <Card.Text>
                        <strong>
                            @{owner.username}
                        </strong>
                    </Card.Text>
                    <Card.Text>
                        {content}
                    </Card.Text>

                </Col>
                <Col xs={2} sm={1} style={{ padding: '0', display: 'flex', justifyContent: 'end' }}>
                    <figure style={{ padding: '0', display: 'flex', justifyContent: 'end' }}>
                        {
                            owner._id === user?._id &&
                            isDeleting?
                            <MdDeleteOutline style={{ width: '25px', height: '25px', marginRight: '15px' }}/>
                            :
                            <MdDeleteForever className='delete' style={{ width: '25px', height: '25px', marginRight: '15px' }} onClick={() => commentDelete()} />
                        }
                    </figure>
                </Col>
            </Row>
        </StyledCommentIemCard>
    )

}

export default CommentItem