import PropTypes from 'prop-types'
import Group from './Group'
import { Link } from 'react-router-dom'
import { useDialog } from '../hooks'
import CreateCommentForm from './CreateCommentForm'
import CommentList from './CommentList'
export default function PostItem({ post }) {
    const {
        user: { firstName, lastName },
    } = post
    const { showModal } = useDialog()

    function showCommentForm() {
        showModal(<CreateCommentForm postId={post?._id} />)
    }
    return (
        <article className="post-item" data-id={post?._id}>
            {/* <Link
                to={`/${firstName + lastName}/posts/${post?._id}`}
                state={post}
            >
                Go to post by {firstName + ' ' + lastName}
            </Link> */}
            <div>{post?.user?.firstName + ' ' + post?.user?.lastName}</div>
            <div>{post?.text}</div>
            <Group>
                <button onClick={showCommentForm}>Comment</button>
                <button>Like</button>
                <button>Share</button>
                <button>See comments</button>
            </Group>
            <CommentList postId={post?._id} />
        </article>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
