import {
    Layout,
    ImageForm,
    PostList,
    PostItem,
    Loader,
    FollowerList,
} from '../components'
import {
    useAuth,
    useAuthUser,
    useAuthUserPosts,
    useDialog,
    useImages,
} from '../hooks'
export default function ProfilePage() {
    const { user } = useAuth()
    const { updateImage } = useAuthUser()
    const { showModal } = useDialog()
    const { userSolidSvg } = useImages()
    // const { posts } = useAuthUserPosts()
    return (
        <>
            {user ? (
                <Layout>
                    <div>
                        <div>
                            <h2>{user?.fullname}</h2>
                            <img
                                src={user?.imgUrl || userSolidSvg}
                                alt="user profile picture"
                                width={50}
                                height={50}
                            />
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
                        <PostList>
                            {user?.posts?.map((post) => (
                                <PostItem key={post?._id} post={post} />
                            ))}
                        </PostList>
                    </div>
                </Layout>
            ) : (
                <Loader />
            )}
        </>
    )
}
