import CommentItem from './CommentItem'
import { useState } from 'react'
import CreateCommentForm from './CreateCommentForm'
export default function CommentList({ postId, comments }) {
    const [mode, setMode] = useState('create')
    const [text, setText] = useState('')
    function updateCommentHandler(id, text) {
        setText(text)
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
            <CreateCommentForm postId={postId} />
        </>
    )
}
