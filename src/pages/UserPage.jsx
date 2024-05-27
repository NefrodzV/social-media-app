import { Layout, PostList, PostItem, Loader } from '../components'
import exampleUserImage from '../assets/example-user.jpg'
import { useLocation } from 'react-router-dom'
import { useAuth, useUser, useUtils, useUserPosts } from '../hooks'
export default function UserPage() {
    const location = useLocation()
    const { id } = location.state
    const { user } = useUser(id)
    const { posts } = useUserPosts(id)
    useAuth()
    return (
        <>
            {user ? (
                <Layout>
                    <div>
                        <div>
                            <h2>{user.fullname}</h2>
                            <img
                                src={exampleUserImage}
                                alt="user profile picture"
                                width={50}
                                height={50}
                            />
                        </div>
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
