import {
    useComments,
    useDialog,
    useDeleteComment,
    useUpdateComment,
} from '../hooks'
import CommentItem from './CommentItem'
import UpdateCommentForm from './UpdateCommentForm'
import PropTypes from 'prop-types'
export default function CommentList({ postId }) {
    const { comments, removeComment, updateCommentText } = useComments({
        postId,
    })
    const { showModal, showAlertDialog, closeDialog } = useDialog()
    const { deleteComment } = useDeleteComment(postId, removeComment)
    const { updateComment } = useUpdateComment(postId, updateCommentText)
    function deleteHandler(id) {
        showAlertDialog(
            'Delete comment',
            'Are you sure you want to delete this comment?',
            deleteComment.bind('id', id),
            closeDialog
        )
    }

    function updateHandler(comment) {
        showModal(
            <UpdateCommentForm
                comment={comment}
                onSubmitHandler={updateComment}
                onCancelHandler={closeDialog}
            />
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
                    updateHandler={updateHandler}
                />
            ))}
        </section>
    )
}
CommentList.propTypes = {
    postId: PropTypes.string,
}
