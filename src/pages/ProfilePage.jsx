import {
    Layout,
    ImageForm,
    PostList,
    PostItem,
    Loader,
    FollowerList,
} from '../components'
import { useAuth, useAuthUser, useAuthUserPosts, useDialog } from '../hooks'
import basicUserIcon from '../assets/example-user.jpg'
export default function ProfilePage() {
    const { user } = useAuth()
    const { updateImage } = useAuthUser()
    const { showModal } = useDialog()
    // const { posts } = useAuthUserPosts()
    return (
        <>
            {user ? (
                <Layout>
                    <div>
                        <div>
                            <h2>{user?.fullname}</h2>
                            <img
                                src={user?.imgUrl ? user.imgUrl : basicUserIcon}
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
                            {user?.posts.map((post) => (
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
