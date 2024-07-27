import {
    Layout,
    PostList,
    PostItem,
    Loader,
    BackButton,
    FollowerList,
} from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useUserPosts } from '../hooks'
import userSvg from '../assets/svgs/user-solid.svg'
import style from '../stylesheets/UserPage.module.css'
export default function UserPage() {
    //
    const location = useLocation()

    const { id } = location.state
    // Update the api so the user returns their posts
    const { user } = useUser(id)
    const { posts } = useUserPosts(id)

    /** TODO: Update the backend to contain:
     * 1- User followers
     * 2- Totals posts
     * 3- Total followers
     * 4-Update list when there are no posts
     */
    return (
        <>
            {user ? (
                <Layout
                    followers={
                        <FollowerList
                            title={`${user?.fullname} followers`}
                            followers={user?.followers}
                        />
                    }
                >
                    <section className={style.page}>
                        <BackButton />
                        <div className={style.user}>
                            <img
                                className={style.image}
                                src={user?.imgUrl || userSvg}
                                alt="user profile picture"
                                width={50}
                                height={50}
                            />
                            <h1>{user.fullname}</h1>
                        </div>
                        <PostList emptyListError={"User doesn't have posts"}>
                            {posts?.map((post) => (
                                <PostItem key={post?._id} post={post} />
                            ))}
                        </PostList>
                    </section>
                </Layout>
            ) : (
                <Loader />
            )}
        </>
    )
}
