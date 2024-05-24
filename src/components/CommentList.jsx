import { useComments, useDialog, useDeleteComment } from '../hooks'
import CommentItem from './CommentItem'
export default function CommentList({ postId }) {
    const { comments, removeComment } = useComments({ postId })
    const { showModal, showAlertDialog, closeDialog } = useDialog()
    const { deleteComment } = useDeleteComment(postId, removeComment)
    function deleteHandler(id) {
        showAlertDialog(
            'Delete comment',
            'Are you sure you want to delete this comment?',
            deleteComment.bind('id', id),
            closeDialog
        )
    }
    return (
        <section>
            <h2>Post comments</h2>
            {comments?.map((comment) => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    deleteHandler={deleteHandler}
                />
            ))}
        </section>
    )
}
