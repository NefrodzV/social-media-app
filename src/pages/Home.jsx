import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { CreatePost, Loader, NavItem } from '../components'
import { useNavigate } from 'react-router-dom'
import { PostList, PostItem, Navigation, Header } from '../components'
export default function Home() {
    const { user, isAuthenticated } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) navigate('/login', { replace: true })
    }, [isAuthenticated, navigate])

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts`,
                    {
                        mode: 'cors',
                        credentials: 'include',
                    }
                )

                const json = await response.json()
                if (!response.ok) {
                    console.log('GET public error response' + json)
                    return
                }
                console.log('posts')
                console.log(json.posts)
                setPosts(json.posts)
            } catch (e) {
                throw new Error('GET public posts error: ' + e)
            }
        }

        getPosts()
    }, [])
    //     useEffect(() => {
    //         async function getUserPosts() {
    //             try {
    //                 const response = await fetch(
    //                     `${import.meta.env.VITE_API_URL}/users/me/posts`,
    //                     {
    //                         mode: 'cors',
    //                         credentials: 'include',
    //                     }
    //                 )
    //
    //                 const json = await response.json()
    //                 if (!response.ok) {
    //                     console.log('Get auth user posts failed:' + json)
    //                     return
    //                 }
    //                 console.log(json)
    //                 setPosts(json.posts)
    //             } catch (e) {
    //                 throw new Error('GET auth user posts failed: ' + e)
    //             }
    //         }
    //         if (user) getUserPosts()
    //     }, [user])

    function openHandler() {
        setShow(true)
    }

    function closeHandler() {
        setShow(false)
    }
    return (
        <div className="layout">
            {user ? (
                <>
                    <Header />
                    <main>
                        <PostList>
                            {posts.map((post) => (
                                <PostItem key={post?._id} post={post} />
                            ))}
                        </PostList>

                        <div>Followers</div>
                        <CreatePost show={show} close={closeHandler} />
                    </main>
                </>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </div>
    )
}
