import PropTypes from 'prop-types'
export default function CommentItem({ comment }) {
    return <li>{comment?.text}</li>
}

CommentItem.propTypes = {
    comment: PropTypes.object,
}
