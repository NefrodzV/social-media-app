import {
    Layout,
    ImageForm,
    PostList,
    PostItem,
    Loader,
    BackButton,
    FollowerList,
} from '../components'
import styles from '../stylesheets/ProfilePage.module.css'
import {
    useAuth,
    useAuthUser,
    useAuthUserPosts,
    useDialog,
    useImages,
} from '../hooks'
import { useNavigate } from 'react-router-dom'
export default function ProfilePage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { updateImage } = useAuthUser()
    const { showModal } = useDialog()
    const { userSolidSvg, leftArrowSvg } = useImages()
    // const { posts } = useAuthUserPosts()
    return (
        <>
            {user ? (
                <Layout>
                    <section className={`${styles.page} inset-box-shadow`}>
                        <BackButton />
                        <div className={styles.user}>
                            <img
                                className={`${styles.image} inset-box-shadow-3`}
                                src={user?.imgUrl || userSolidSvg}
                                alt="user profile picture"
                            />
                            <h1>{user?.fullname}</h1>
                        </div>
                        <button
                            onClick={() => {
                                showModal(
                                    <ImageForm onSuccessHandler={updateImage} />
                                )
                            }}
                        >
                            Change image
                        </button>
                        <PostList style={styles.posts}>
                            {user?.posts?.map((post) => (
                                <PostItem key={post?._id} post={post} />
                            ))}
                        </PostList>
                    </section>
                </Layout>
            ) : (
                <Loader />
            )}
        </>
    )
}
