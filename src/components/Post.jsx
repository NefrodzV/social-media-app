import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeletePost, usePost } from '../hooks'
import { AlertDialog, Loader } from '../components'
import { useState } from 'react'
export default function Post() {
    const { postId } = useParams()
    const { post, loading } = usePost({ postId })
    const { deleteStatus, deletePost } = useDeletePost({ postId })
    const [editActive, setEditActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const navigate = useNavigate()

    function backHandler() {
        navigate(-1)
    }

    function activeHandler(e) {
        const id = e.target.id
        switch (id) {
            case 'editPost':
                setEditActive(true)
                break
            case 'deletePost':
                setDeleteActive(true)
                break
            default:
                throw new Error('POST must provide a case for activeHandler')
        }
    }
    function deactive() {
        if (editActive) setEditActive(false)
        if (deleteActive) setDeleteActive(false)
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
                            <button id="editPost" onClick={activeHandler}>
                                Edit
                            </button>
                            <button id="deletePost" onClick={activeHandler}>
                                Delete
                            </button>
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
                    <AlertDialog
                        title={'Delete post confirmation'}
                        text={'Are you sure you want to delete this post?'}
                        onCancel={deactive}
                        onSubmit={deletePost}
                        isActive={deleteActive}
                    />
                </section>
            )}
        </>
    )
}
