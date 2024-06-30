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
    const { userSolidSvg, commentSvg, commentsSvg, likeSvg, ellipsisSvg } =
        useImages()
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
        >
            <div className="post-item-body">
                <img
                    className="post-item-icon"
                    src={imgUrl || userSolidSvg}
                    style={{ width: 50 }}
                    alt="user profile image"
                />
                <div className="dropdown-menu">
                    <img
                        className="icon"
                        src={ellipsisSvg}
                        alt="dropdown icon"
                    />
                    <div className="content">
                        <button
                            className="dropdown-button"
                            onClick={editPostHandler}
                        >
                            Edit
                        </button>

                        <button
                            className="dropdown-button"
                            onClick={deletePostHandler}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                {/* {post?.isMine && (
                <div className="dropdown-menu">
                    <button onClick={editPostHandler}>Edit</button>
                    <button onClick={deletePostHandler}>Delete</button>
                </div>
            )} */}
                <div className="content fullwidth">
                    {firstName && lastName && (
                        <div className="post-item-user">
                            {post?.user?.firstName + ' ' + post?.user?.lastName}
                        </div>
                    )}
                    <div>{post?.text}</div>{' '}
                    <Group style={'post-item-controls'}>
                        <button
                            className="post-item-button"
                            onClick={showCommentForm}
                        >
                            <img src={commentSvg} alt="comment icon" />
                            <span>Comment</span>
                        </button>
                        {!post?.isMine && (
                            <button
                                className="post-item-button"
                                onClick={() => likeHandler(post)}
                            >
                                <img src={likeSvg} alt="like post icon" />
                                <span>Like</span>
                            </button>
                        )}
                        {/* <button>Share</button> */}
                        {!isCommentsOpen && (
                            <button
                                className="post-item-button"
                                onClick={() => setIsCommentsOpen(true)}
                            >
                                <img
                                    src={commentsSvg}
                                    alt="view comments icon"
                                />
                                <span>Comments</span>
                            </button>
                        )}
                    </Group>
                </div>
            </div>
            {/* {post?.isMine && (
                <div className="controls">
                    <button onClick={editPostHandler}>Edit</button>
                    <button onClick={deletePostHandler}>Delete</button>
                </div>
            )} */}

            {isCommentsOpen && <CommentList postId={post?._id} />}
        </article>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
