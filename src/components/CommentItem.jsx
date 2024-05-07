import PropTypes from 'prop-types'
import { useState } from 'react'
import { Group } from '../components'
export default function CommentItem({ comment, updateComment, deleteComment }) {
    const [show, setShow] = useState(false)
    return (
        <li className="comment">
            <div>
                User: {comment.user.firstName + '' + comment.user.lastName}
            </div>
            <div>{comment?.text}</div>
            <div
                style={{
                    display: comment.user.mine ? '' : 'none',
                }}
            >
                <button
                    onClick={updateComment.bind('comment', {
                        id: comment._id,
                        text: comment.text,
                    })}
                    type="button"
                >
                    update
                </button>
                <button onClick={() => setShow(true)} type="button">
                    delete
                </button>
            </div>
            <form
                method="dialog"
                style={{
                    display: show ? 'block' : 'none',
                    position: 'absolute',
                    inset: 10,
                    background: 'white',
                    border: '1px solid black',
                }}
            >
                Are you sure you want to delete this comment?
                <Group>
                    <button
                        onClick={deleteComment.bind('commentId', comment._id)}
                        type="button"
                    >
                        Ok
                    </button>
                    <button onClick={() => setShow(false)} type="button">
                        Cancel
                    </button>
                </Group>
            </form>
        </li>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object,
}
