import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { CreatePost, Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import PostList from '../components/PostList'
import PostItem from '../components/PostItem'
import Navigation from '../components/Navigation'
export default function Home() {
    const { user, isAuthenticated } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) navigate('/login', { replace: true })
    }, [isAuthenticated, navigate])
    console.log(user)
    useEffect(() => {
        async function getUserPosts() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/me/posts`,
                    {
                        mode: 'cors',
                        credentials: 'include',
                    }
                )

                const json = await response.json()
                if (!response.ok) {
                    console.log('Get auth user posts failed:' + json)
                    return
                }
                console.log(json)
                setPosts(json.posts)
            } catch (e) {
                throw new Error('GET auth user posts failed: ' + e)
            }
        }
        if (user) getUserPosts()
    }, [user])
    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome {user?.fullname}</h1>
                    <PostList>
                        {posts.map((post) => (
                            <PostItem key={post?._id} post={post} />
                        ))}
                    </PostList>
                    <CreatePost />
                    <Navigation />
                </>
            ) : null}
        </div>
    )
}
