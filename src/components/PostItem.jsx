import PropTypes from 'prop-types'
import CommentList from './CommentList'
export default function PostItem({ post }) {
    return (
        <li data-id={post?._id}>
            <div>{post?.user?.firstName + ' ' + post?.user?.lastName}</div>
            <div>{post?.text}</div>
            <CommentList postId={post?._id} comments={post?.comments} />
        </li>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
