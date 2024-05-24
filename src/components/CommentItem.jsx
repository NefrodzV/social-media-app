import PropTypes from 'prop-types'
import { useUtils } from '../hooks'
export default function CommentItem({ comment, deleteHandler, updateHandler }) {
    const { formatFullname } = useUtils()
    return (
        <article className="comment">
            <div>User: {formatFullname(comment?.user)}</div>
            <div>{comment?.text}</div>
            <div
                style={{
                    display: comment.mine ? '' : 'none',
                }}
            >
                <button
                    onClick={updateHandler.bind('comment', comment)}
                    type="button"
                >
                    update
                </button>
                <button
                    onClick={deleteHandler.bind('id', comment._id)}
                    type="button"
                >
                    delete
                </button>
            </div>
        </article>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object,
}
