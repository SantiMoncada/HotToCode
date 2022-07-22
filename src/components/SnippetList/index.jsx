import SnippetCard from "../SnippetCard"
import "./SnippetList.css"
import { Col, Row } from "react-bootstrap"

const SnippetList = ({ snippets, maxColums }) => {

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

    return (

        <Row>
            {snippets.map(snippet => {
                return (
                    <Col md={md} lg={lg} xl={xl} key={snippet._id} className="mb-4">
                        <SnippetCard {...snippet} />
                    </Col>
                )
            })}
        </Row>

    )
}

export default SnippetList
