import { Modal, Col, Row } from "react-bootstrap"

const ModalLink = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation="false"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Share Coding Area</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Row>
                    <Col xs={12} >
                        <p>You can share this link to anyone and have some fun coding together</p>
                        <p><strong>The link has been already copied to your clipboard</strong></p>
                        <hr></hr>
                        <p style={{ wordWrap: "break-word" }}>{props.linkShare}</p>
                    </Col>
                    <Col xs={12} className="">
                        <figure width={"100%"}>{props.qrCodeData}</figure>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );

}

export default ModalLink