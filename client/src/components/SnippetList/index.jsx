import SnippetCard from "../SnippetCard"
import "./SnippetList.css"
import { Col, Row } from "react-bootstrap"
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react"
import { useEffect } from "react";

const SnippetList = ({ snippets, maxColums, fireFinalActions }) => {

    const { UpdateUserData } = useContext(UserContext)

    let md, lg, xl
    switch (maxColums) {
        case 1:
            md = 12
            lg = 12
            xl = 12
            break
        case 2:
            md = 12
            lg = 6
            xl = 6
            break
        case 3:
            md = 12
            lg = 6
            xl = 4
            break
        case 4:
            md = 6
            lg = 4
            xl = 3
            break
        default:
            md = 12
            lg = 6
            xl = 4
    }

    useEffect(() => {
        UpdateUserData()
    }, [])


    return (

        <Row>
            {snippets.map(snippet => {
                return (
                    <Col md={md} lg={lg} xl={xl} key={snippet._id} className="mb-4">
                        <SnippetCard {...snippet} fireFinalActions={fireFinalActions} />
                    </Col>
                )
            })}
        </Row>

    )
}

export default SnippetList
