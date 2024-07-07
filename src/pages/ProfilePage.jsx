import {
    Layout,
    ImageForm,
    PostList,
    PostItem,
    Loader,
    BackButton,
} from '../components'
import styles from '../stylesheets/ProfilePage.module.css'
import { useAuth, useAuthUser, useDialog, useImages } from '../hooks'
import { useNavigate } from 'react-router-dom'
import DropdownMenu from '../components/DropdownMenu'
export default function ProfilePage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { updateImage } = useAuthUser()
    const { showModal } = useDialog()
    const { userSolidSvg, leftArrowSvg } = useImages()
    return (
        <>
            {user ? (
                <Layout>
                    <section className={`${styles.page} inset-box-shadow`}>
                        <BackButton />
                        <div className={styles.user}>
                            <img
                                className={`${styles.image} inset-box-shadow-3`}
                                src={user?.imgUrl || userSolidSvg}
                                alt="user profile picture"
                            />
                            <h1>{user?.fullname}</h1>
                            <DropdownMenu
                                items={[
                                    {
                                        text: 'change image',
                                        clickHandler: () =>
                                            console.log(
                                                'Opening change rpfile image from'
                                            ),
                                    },
                                ]}
                            />
                        </div>
                        <PostList style={styles.posts}>
                            {user?.posts?.map((post) => (
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
