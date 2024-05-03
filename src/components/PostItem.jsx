import PropTypes from 'prop-types'
export default function PostItem({ post }) {
    return <li data-id={post?._id}>{post?.text}</li>
}

PostItem.propTypes = {
    post: PropTypes.object,
}
