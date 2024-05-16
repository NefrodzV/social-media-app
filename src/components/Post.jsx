import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeletePost, useDialog, usePost } from '../hooks'
import { Loader } from '../components'
import EditPostForm from './EditPostForm'
export default function Post() {
    const { postId } = useParams()
    const { post, loading } = usePost({ postId })
    const { deleteStatus, deletePost } = useDeletePost({ postId })
    const { closeDialog, showModal, showAlertDialog } = useDialog()
    const navigate = useNavigate()

    if (deleteStatus === 'SUCCESS') backHandler()
    function backHandler() {
        navigate(-1)
    }

    function deletePostHandler() {
        showAlertDialog(
            'Delete post confirmation',
            'Are you sure you want to delete this post?',
            deletePost,
            closeDialog
        )
    }

    function editPostHandler() {
        showModal(<EditPostForm post={post} />)
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <section className="post">
                    <div>
                        <button onClick={backHandler}>Go back</button>
                        <h2>Post</h2>
                        <div className="controls">
                            <button onClick={editPostHandler}>Edit</button>
                            <button onClick={deletePostHandler}>Delete</button>
                        </div>
                    </div>

                    <article>
                        <div className="author">
                            <Link
                                to={`/${post?.user?.firstName}${post?.user?.lastName}`}
                            >
                                Go to
                                {post?.user?.firstName} {post?.user?.lastName}
                                profile
                            </Link>
                            <img src="#" />
                            <span className="name">
                                {post?.user.firstName +
                                    ' ' +
                                    post?.user?.lastName}
                            </span>
                        </div>
                        <p className="body">{post?.text}</p>
                    </article>
                    <section>
                        <h2>Post comments</h2>
                    </section>
                </section>
            )}
        </>
    )
}
