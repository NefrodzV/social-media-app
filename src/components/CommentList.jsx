import CommentItem from './CommentItem'
export default function CommentList({ postId, comments }) {
    function updateCommentHandler() {
        console.log('update comment')
    }
    async function deleteCommentHandler(commentId) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    mode: 'cors',
                }
            )
        } catch (e) {
            throw new Error('DELETE comment error: ' + e)
        }
    }

    async function sendComment(data) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
                {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                console.log('Error sending comment in post' + postId)
                return
            }
            console.log('Success sending comment to post:' + postId)
        } catch (e) {
            throw new Error('POST comment error: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        sendComment(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <>
            <div>Comments</div>
            <ul>
                {comments?.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                    />
                ))}
            </ul>
            <form onSubmit={onSubmitHandler}>
                <input type="hidden" name="postId" value={postId} />
                <input
                    type="text"
                    name="text"
                    placeholder={
                        comments?.length
                            ? 'Write a comment'
                            : 'Be the first one to comment'
                    }
                />
                <button>submit</button>
            </form>
        </>
    )
}
