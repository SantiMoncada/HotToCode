import { useContext } from 'react';
import Toast from 'react-bootstrap/Toast'
import { MessageContext } from '../../contexts/userMessage.context';

function UserMessage() {

    const { setShowMessage, showMessage } = useContext(MessageContext)

    return (
        <Toast
            show={showMessage.show}
            onClose={() => setShowMessage({ ...showMessage, show: false })}
            style={{ position: 'fixed', bottom: 30, right: 30 }}
            autohide
            delay={5000}
        >
            <Toast.Header>
                <strong className="me-auto">{showMessage.title}</strong>
            </Toast.Header>
            <Toast.Body>{showMessage.text}</Toast.Body>
        </Toast>
    );
}

export default UserMessage