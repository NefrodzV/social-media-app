import { useEffect } from 'react'
import { Loader, PostList, PostItem, Layout } from '../components'
import { useAuth, usePosts } from '../hooks'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const { user } = useAuth()
    const { posts, likePost } = usePosts()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])
    return (
        <>
            {user ? (
                <Layout>
                    <PostList classNames={'inset-box-shadow'}>
                        {posts.map((post) => (
                            <PostItem
                                key={post?._id}
                                post={post}
                                likeHandler={likePost}
                            />
                        ))}
                    </PostList>
                </Layout>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </>
    )
}
