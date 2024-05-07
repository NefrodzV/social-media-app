import { useState } from 'react'
import { STATUS } from '../constants'
import PropTypes from 'prop-types'
export default function UpdateCommentForm({
    postId,
    comment,
    cancel,
    onChangeComment,
}) {
    const [status, setStatus] = useState(null)

    async function updateComment(data) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${comment.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                setStatus(STATUS.ERROR)
                return
            }
            setStatus(STATUS.SUCCESS)
        } catch (e) {
            setStatus(STATUS.ERROR)
            throw new Error('PUT update comment error: ' + e)
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        updateComment(Object.fromEntries(new FormData(e.target)))
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="text"
                name="text"
                value={comment?.text}
                onChange={onChangeComment}
            />
            <button>update</button>
            <button onClick={cancel} type="button">
                cancel
            </button>
        </form>
    )
}

UpdateCommentForm.propTypes = {
    postId: PropTypes.string,
    comment: PropTypes.object,
    cancel: PropTypes.func,
    onChangeComment: PropTypes.func,
}
