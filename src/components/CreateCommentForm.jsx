import PropTypes from 'prop-types'
export default function CreateCommentForm({ postId, isFirstComment }) {
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
        <form onSubmit={onSubmitHandler}>
            <input type="hidden" name="postId" value={postId} />
            <input
                type="text"
                name="text"
                placeholder={
                    isFirstComment
                        ? 'Be the first one to comment'
                        : 'Write a comment'
                }
            />
            <button>submit</button>
        </form>
    )
}
CreateCommentForm.propTypes = {
    postId: PropTypes.string,
    isFirstComment: PropTypes.bool,
}
