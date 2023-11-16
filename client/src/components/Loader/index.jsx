import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const StyledSpinnerWrapper = styled.figure`
    display: flex;
    justify-content: center;
`

const StyledSpinner  = styled(Spinner)`
    width: 4rem;
    height: 4rem;
`

const Loader = () => {

    return (
        <StyledSpinnerWrapper>
            <StyledSpinner animation="border" variant='info' role="status">
                <span className="visually-hidden">Loading...</span>
            </StyledSpinner>
        </StyledSpinnerWrapper>
    )
}

export default Loader