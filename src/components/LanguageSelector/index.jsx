import './LenguageSelector.css'
import { Form, Row, Col } from 'react-bootstrap';

import links from "./../../utils/lenIconsSvgLinks"

const { jsIcon, cIcon, pythonIcon, rustIcon, cssIcon } = links

const LanguageSelector = ({ len, setLen }) => {


    const handleChange = (event) => {
        setLen(event.target.value)
    }

    let icon

    switch (len) {
        case 'JS':
            icon = jsIcon
            break

        case 'C':
            icon = cIcon
            break

        case 'PYTHON':
            icon = pythonIcon
            break
        case 'CSS':
            icon = cssIcon
            break
        case 'RUST':
            icon = rustIcon
            break
        default:

    }
    return (
        <Form.Group className='LenguageSelector'>
            <img src={icon} alt="" />
            <Form.Select value={len} onChange={handleChange} aria-label="Default select example">
                <option value="JS">JavaScript</option>
                <option value="PYTHON">Python</option>
                <option value="C">C++</option>
                <option value="CSS">CSS</option>
                <option value="RUST">RUST</option>
            </Form.Select>
        </Form.Group>
    );
}
export default LanguageSelector