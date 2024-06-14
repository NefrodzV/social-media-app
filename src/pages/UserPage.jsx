import { Layout, PostList, PostItem, Loader, UserList } from '../components'
import userIcon from '../assets/example-user.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useUserPosts } from '../hooks'
export default function UserPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = location.state
    // Update the api so the user returns their posts
    const { user } = useUser(id)
    const { posts } = useUserPosts(id)
    return (
        <>
            {user ? (
                <Layout>
                    <div>
                        <div>
                            <button onClick={() => navigate(-1)}>
                                go back
                            </button>
                            <h2>{user.fullname}</h2>
                            <img
                                src={user?.imgUrl ? user?.imgUrl : userIcon}
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
                    <UserList
                        title={`${user.fullname} followers`}
                        followers={user?.followers}
                    />
                </Layout>
            ) : (
                <Loader />
            )}
        </>
    )
}
