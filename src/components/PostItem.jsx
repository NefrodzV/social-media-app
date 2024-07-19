import PropTypes from 'prop-types'
import Group from './Group'
import { useDeletePost, useDialog, useImages, useUtils } from '../hooks'
import CreateCommentForm from './CreateCommentForm'
import CommentList from './CommentList'
import { useState } from 'react'
import EditPostForm from './EditPostForm'
import DropdownMenu from './DropdownMenu'
import styles from '../stylesheets/PostItem.module.css'
import { Link } from 'react-router-dom'
export default function PostItem({ post, likeHandler }) {
    const {
        user: { firstName, lastName, imgUrl },
    } = post

    console.log(post)
    const { showModal, showAlertDialog } = useDialog()
    const { userSolidSvg, commentSvg, commentsSvg, likeSvg } = useImages()
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)
    const { formatFullname } = useUtils()
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
            className={styles.post}
        >
            <div className={styles.container}>
                <img
                    className={`${styles.icon}`}
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
                <div className={`${styles.content} fullwidth`}>
                    {firstName && lastName && (
                        <div className={styles.user}>
                            <div className={styles.name}>
                                <span className="hidden-text">Post by </span>
                                {formatFullname(post?.user)}
                            </div>
                            <Link
                                className="card-link"
                                to={`/${formatFullname(post?.user)}`}
                                state={{ userId: post?.user?._id }}
                            >
                                <span className="hidden-text">
                                    Go to {formatFullname(post?.user)} profile
                                </span>
                            </Link>
                        </div>
                    )}
                    <p className={styles.text}>
                        {/* Discover our new app! Go to sign up today and explore
                        exclusive features designed just for you. Don't miss out
                        on this exciting opportunity! */}
                    </p>
                    <Group style={styles.controls}>
                        <button onClick={showCommentForm}>
                            <img src={commentSvg} alt="comment icon" />
                            <span>Comment</span>
                        </button>
                        {!post?.isMine && (
                            <button onClick={() => likeHandler(post)}>
                                <img src={likeSvg} alt="like post icon" />
                                <span>Like</span>
                            </button>
                        )}
                        {/* <button>Share</button> */}
                        <button
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
