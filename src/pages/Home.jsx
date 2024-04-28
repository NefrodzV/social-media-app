import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { CreatePost, Loader } from '../components'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!user) navigate('/login', { replace: true })
    }, [user, navigate])

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
                    <h2>Follower</h2>
                    <ul>
                        {posts.map((post) => (
                            <li key={post._id}>{post?.text}</li>
                        ))}
                    </ul>
                    <CreatePost />
                </>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </div>
    )
}
