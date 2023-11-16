import commentService from './../../services/commets.services'

import { AuthContext } from '../../contexts/auth.context'
import { useContext,useState } from "react"

import { Card, Row, Col } from "react-bootstrap"

import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md'

import styled, { keyframes,css } from 'styled-components'

const StyledDeletebutton = css`
    width: 25px; 
    height: 25px;
    margin-right: 15px;
`

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
const animation = keyframes`
    from {
        background-color: none;
    }

    to {
        background-color: rgba(229, 76, 76, 0.637);
    }
 `

const StyledDeleteIcon = styled(MdDeleteForever)`
    ${StyledDeletebutton}

    &:hover{
        animation: ${animation};
        border-radius: 50%;
        animation-fill-mode: forwards;
        animation-duration: 0.3s;
    }
`

const StyledDeleteIconOutline = styled(MdDeleteOutline)`
    ${StyledDeletebutton}
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
                            <StyledDeleteIconOutline />
                            :
                            <StyledDeleteIcon onClick={() => commentDelete()} />
                        }
                    </figure>
                </Col>
            </Row>
        </StyledCommentIemCard>
    )

}

export default CommentItem