import PropTypes from 'prop-types'
import Group from './Group'
import { useDeletePost, useDialog, useImages } from '../hooks'
import CreateCommentForm from './CreateCommentForm'
import CommentList from './CommentList'
import { useState } from 'react'
import EditPostForm from './EditPostForm'
import DropdownMenu from './DropdownMenu'
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
                    alt="user profile image"
                />
                {post?.isMine && (
                    <DropdownMenu
                        items={[
                            {
                                text: 'Edit',
                                clickHandler: editPostHandler,
                            },
                            {
                                text: 'Delete',
                                clickHandler: deletePostHandler,
                            },
                        ]}
                    />
                )}
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
                        <button
                            className="post-item-button"
                            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        >
                            <img src={commentsSvg} alt="view comments icon" />
                            <span>Comments</span>
                        </button>
                    </Group>
                </div>
            </div>
            {isCommentsOpen && (
                <CommentList classes="small-inset-shadow" postId={post?._id} />
            )}
        </article>
    )
}

PostItem.propTypes = {
    post: PropTypes.object,
}
