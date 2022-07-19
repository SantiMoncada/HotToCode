import SnippetCard from "../SnippetCard"

const SnippetList = ({ snippets }) => {
    return (
        <>
            {snippets.map(snippets => {
                return (
                    <div key={snippets_id}>
                        <SnippetCard {...snippets} />
                    </div>
                )
            })}
        </>
    )
}

export default SnippetList