import { Layout, Post } from '../components'
import { useAuth } from '../hooks'
export default function PostPage() {
    useAuth()
    return (
        <Layout>
            <Post />
        </Layout>
    )
}
