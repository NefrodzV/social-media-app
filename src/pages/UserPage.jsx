import { Layout, PostList, PostItem, Loader, UserList } from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useUserPosts, useImages } from '../hooks'
export default function UserPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = location.state
    // Update the api so the user returns their posts
    const { user } = useUser(id)
    const { posts } = useUserPosts(id)
    const { userSolidSvg } = useImages()
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
                                src={user?.imgUrl || userSolidSvg}
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
