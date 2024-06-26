import PropTypes from 'prop-types'
import { useDialog, useNotification } from '../hooks'
export default function CreateCommentForm({
    postId,
    isFirstComment,
    onSuccessHandler,
}) {
    const { closeDialog } = useDialog()
    const { showToast } = useNotification()
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
            closeDialog()
            onSuccessHandler ? onSuccessHandler() : null
            showToast('Comment written successfully!')
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
    onSuccessHandler: PropTypes.func,
}
