import { useEffect } from 'react'
import { Loader, PostList, PostItem, Layout, UserList } from '../components'
import { useAuth, usePosts, useFollowers } from '../hooks'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const { user } = useAuth()
    const { posts } = usePosts()
    const navigate = useNavigate()
    const { followers, addFollower } = useFollowers()
    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])
    return (
        <>
            {user ? (
                <Layout>
                    <PostList>
                        {posts.map((post) => (
                            <PostItem key={post?._id} post={post} />
                        ))}
                    </PostList>

                    <UserList
                        title={'Followers Recommendations'}
                        users={followers}
                        sendRequest={addFollower}
                    />
                </Layout>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </>
    )
}
