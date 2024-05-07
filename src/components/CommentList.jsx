import CommentItem from './CommentItem'
import { useState } from 'react'
import CreateCommentForm from './CreateCommentForm'
import UpdateCommentForm from './UpdateCommentForm'
export default function CommentList({ postId, comments }) {
    const [comment, setComment] = useState(null)

    console.log(comment)
    function updateCommentHandler(comment) {
        setComment(comment)
    }
    function resetUpdateComment() {
        setComment(null)
    }

    function onChangeCommentText(e) {
        const updatedComment = { ...comment, text: e.target.value }
        setComment(updatedComment)
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
            {comment ? (
                <UpdateCommentForm
                    postId={postId}
                    comment={comment}
                    cancel={resetUpdateComment}
                    onChangeComment={onChangeCommentText}
                />
            ) : (
                <CreateCommentForm
                    postId={postId}
                    isFirstComment={comments.length === 0}
                />
            )}
        </>
    )
}
