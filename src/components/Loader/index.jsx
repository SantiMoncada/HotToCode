
import { Spinner } from 'react-bootstrap'

const Loader = () => {

    return (
        <figure style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner animation="border" variant='info' role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </figure>
    )
}

export default Loader