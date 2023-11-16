import styled from 'styled-components'

const StyledFooter = styled.footer`
    background-color: #f8f9fa;
    font-size: .7em;
    text-align: center;
    padding: 5px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
`

const Footer = () => {

    return (
         <StyledFooter>© Santiago Moncada & Jorge Hermo</StyledFooter>
    )
}

export default Footer