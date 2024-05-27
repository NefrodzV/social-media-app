import { useContext } from 'react'
import { UserContext } from '../App'
import { Header, Loader, Layout, PostList } from '../components'
import exampleUserImage from '../assets/example-user.jpg'
import { useLocation } from 'react-router-dom'
import { useAuth, useUser, useUtils, useUserPosts } from '../hooks'
export default function UserPage() {
    const location = useLocation()
    const { id } = location.state
    const { user } = useUser(id)
    const { formatFullname } = useUtils()
    useAuth()
    const { posts } = useUserPosts(id)
    return (
        <Layout>
            <div>
                <img src={exampleUserImage} alt="" />
                <h2>{formatFullname(user)}</h2>
            </div>
            <PostList></PostList>
        </Layout>
    )
}
