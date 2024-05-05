import PropTypes from 'prop-types'
import CommentList from './CommentList'
import CommentItem from './CommentItem'
export default function PostItem({ post }) {
    return (
        <li data-id={post?._id}>
            <div>{post?.user?.firstName + ' ' + post?.user?.lastName}</div>
            <div>{post.text}</div>
            <CommentList postId={post?._id}>
                {post.comments.map((comment) => (
                    <CommentItem key={comment?._id} comment={comment} />
                ))}
            </CommentList>
        </li>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
