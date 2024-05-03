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
                    {/* <h1>Welcome {user?.fullname}</h1> */}
                    <Navigation>
                        <NavItem>
                            <button type="button" onClick={openHandler}>
                                post
                            </button>
                        </NavItem>
                    </Navigation>
                    <PostList>
                        {posts.map((post) => (
                            <PostItem key={post?._id} post={post} />
                        ))}
                    </PostList>
                    <h1>Followers</h1>
                    {/* <CreatePost /> */}
                    <CreatePost show={show} close={closeHandler} />
                </>
            ) : (
                <Loader width={16} height={16} borderWidth={4} />
            )}
        </div>
    )
}
