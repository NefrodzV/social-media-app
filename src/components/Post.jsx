import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeletePost, useDialog, usePost, useToast } from '../hooks'
import { AlertDialog, Loader } from '../components'
export default function Post() {
    const { postId } = useParams()
    const { post, loading } = usePost({ postId })
    const { deletePost } = useDeletePost({ postId })
    const {
        setDialog,
        DIALOG_TYPE: { ALERT_DIALOG },
        closeDialog,
    } = useDialog()
    // const [editActive, setEditActive] = useState(false)
    // const [deleteActive, setDeleteActive] = useState(false)
    const navigate = useNavigate()

    function backHandler() {
        navigate(-1)
    }

    function editPostHandler() {
        const dialog = {
            type: ALERT_DIALOG,
            title: 'Delete post confirmation',
            text: 'Are you sure you want to delete this post?',
            onSubmitHandler: deletePost,
            onCancelHandler: closeDialog,
        }

        console.log(dialog)
        setDialog(dialog)
    }
    // function activeHandler(e) {
    //     const id = e.target.id
    //     switch (id) {
    //         case 'editPost':
    //             showToast('My message from edit editing...', 'type')
    //             // setEditActive(true)
    //             break
    //         case 'deletePost':
    //             setDeleteActive(true)
    //             break
    //         default:
    //             throw new Error('POST must provide a case for activeHandler')
    //     }
    // }
    // function deactive() {
    //     if (editActive) setEditActive(false)
    //     if (deleteActive) setDeleteActive(false)
    // }

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
                            {/* <button onClick={activeHandler}>Delete</button> */}
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
                    {/* <AlertDialog
                        title={'Delete post confirmation'}
                        text={'Are you sure you want to delete this post?'}
                        onCancel={deactive}
                        onSubmit={deletePost}
                        isActive={deleteActive}
                    /> */}
                </section>
            )}
        </>
    )
}
