import PropTypes from 'prop-types'
import Group from './Group'
import { Link } from 'react-router-dom'
import { useDialog } from '../hooks'
import CreateCommentForm from './CreateCommentForm'
import CommentList from './CommentList'
import { useState } from 'react'
export default function PostItem({ post }) {
    const {
        user: { firstName, lastName },
    } = post
    const { showModal } = useDialog()

    const [isCommentsOpen, setIsCommentsOpen] = useState(false)
    function showCommentForm() {
        showModal(<CreateCommentForm postId={post?._id} />)
    }
    return (
        <article
            onMouseLeave={() => setIsCommentsOpen(false)}
            className="post-item"
            data-id={post?._id}
        >
            <div>{post?.user?.firstName + ' ' + post?.user?.lastName}</div>
            <div>{post?.text}</div>
            <Group>
                <button onClick={showCommentForm}>Comment</button>
                <button>Like</button>
                <button>Share</button>
                {!isCommentsOpen && (
                    <button onClick={() => setIsCommentsOpen(true)}>
                        See comments
                    </button>
                )}
            </Group>
            {isCommentsOpen && <CommentList postId={post?._id} />}
        </article>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
