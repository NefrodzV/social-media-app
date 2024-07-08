import {
    Layout,
    PostList,
    PostItem,
    Loader,
    UserList,
    BackButton,
} from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useUserPosts, useImages, useUtils } from '../hooks'
import style from '../stylesheets/ProfilePage.module.css'
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
                    <section className="inset-box-shadow">
                        <BackButton />
                        <div>
                            <img
                                src={user?.imgUrl || userSolidSvg}
                                alt="user profile picture"
                                width={50}
                                height={50}
                            />
                            <h1>{user.fullname}</h1>
                        </div>
                        <PostList>
                            {posts.map((post) => (
                                <PostItem key={post?._id} post={post} />
                            ))}
                        </PostList>
                    </section>
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
