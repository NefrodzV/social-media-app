import { Layout, PostList, PostItem, Loader, ImageForm } from '../components'
import userIcon from '../assets/example-user.jpg'
import { useLocation } from 'react-router-dom'
import { useAuth, useUser, useUserPosts, useDialog } from '../hooks'
export default function UserPage() {
    const location = useLocation()
    const { id } = location.state
    const { user, updateImage } = useUser(id)

    const { posts } = useUserPosts(id)
    useAuth()
    const { showModal } = useDialog()
    return (
        <>
            {user ? (
                <Layout>
                    <div>
                        <div>
                            <h2>{user.fullname}</h2>
                            <img
                                src={user?.imgUrl ? user.imgUrl : userIcon}
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
                            {posts.map((post) => (
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
