import PropTypes from 'prop-types'
import Group from './Group'
import { Link } from 'react-router-dom'
import { useDeletePost, useDialog, useImages } from '../hooks'
import CreateCommentForm from './CreateCommentForm'
import CommentList from './CommentList'
import { useState } from 'react'
import EditPostForm from './EditPostForm'
export default function PostItem({ post, likeHandler }) {
    const {
        user: { firstName, lastName, imgUrl },
    } = post
    const { showModal, showAlertDialog } = useDialog()
    const { userSolidSvg } = useImages()
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)
    const { deletePost } = useDeletePost({ postId: post?._id })
    function showCommentForm() {
        showModal(<CreateCommentForm postId={post?._id} />)
    }
    function deletePostHandler() {
        showAlertDialog(
            'Delete post confirmation',
            'Are you sure you want to delete this post?',
            deletePost
        )
    }

    function editPostHandler() {
        showModal(<EditPostForm post={post} />)
    }
    return (
        <article
            // onMouseLeave={() => setIsCommentsOpen(false)}
            className="post-item"
            data-id={post?._id}
        >
            {post?.isMine && (
                <div className="controls">
                    <button onClick={editPostHandler}>Edit</button>
                    <button onClick={deletePostHandler}>Delete</button>
                </div>
            )}

            {firstName && lastName && (
                <div>
                    <img
                        src={imgUrl || userSolidSvg}
                        style={{ width: 50 }}
                        alt="user profile image"
                    />
                    {post?.user?.firstName + ' ' + post?.user?.lastName}
                </div>
            )}
            <div>{post?.text}</div>
            <Group>
                <button onClick={showCommentForm}>Comment</button>
                {!post?.isMine && (
                    <button onClick={() => likeHandler(post._id, post?.iLiked)}>
                        Like
                    </button>
                )}
                {/* <button>Share</button> */}
                {!isCommentsOpen && (
                    <button onClick={() => setIsCommentsOpen(true)}>
                        Comments
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
