import PropTypes from 'prop-types'
import Group from './Group'
export default function PostItem({ post }) {
    return (
        <article data-id={post?._id}>
            <div>{post?.user?.firstName + ' ' + post?.user?.lastName}</div>
            <div>{post?.text}</div>
            <Group>
                <button>
                    Comment
                    <span style={{ display: 'none' }}>Total comments</span>
                    <span>{post?.commentCount}</span>
                </button>
                <button>Share</button>
                <button>Like</button>
                <button>Bookmark</button>
            </Group>
        </article>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
