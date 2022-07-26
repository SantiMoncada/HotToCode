import CommentItem from "../CommentItem"

const CommentList = ({ commentsData, fireFinalActions }) => {

    return (
        <>
            {
                commentsData.map(comment => {
                    return (
                        <div key={comment._id}>
                            <CommentItem {...comment} fireFinalActions={fireFinalActions} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default CommentList
