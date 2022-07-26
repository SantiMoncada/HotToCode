import CommentItem from "../CommentItem"

const CommentList = ({ commentsData, loadComments }) => {

    return (
        <>
            {
                commentsData.map(comment => {
                    return (
                        <div key={comment._id}>
                            <CommentItem {...comment} loadComments={loadComments} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default CommentList
