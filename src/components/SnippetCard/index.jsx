import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'

const SnippetCard = ({ title, content, snippet_id, owner }) => {

    const { user } = useContext(AuthContext)

    return (<>

    </>)
}

export default SnippetCard