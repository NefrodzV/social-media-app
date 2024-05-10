import { Loader, PostList, PostItem, Layout } from '../components'
import { useAuth, usePosts, useAuthUser } from '../hooks'
export default function Home() {
    const { user } = useAuthUser()
    const { posts } = usePosts()
    useAuth()

    return (
        <>
            {user ? (
                <Layout>
                    <PostList>
                        {posts.map((post) => (
                            <PostItem key={post?._id} post={post} />
                        ))}
                    </PostList>
                </Layout>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </>
    )
}
