import { Layout, FollowerList } from '../components'
import { useAuthUser, useDeleteFollower } from '../hooks'

export default function FollowersPage() {
    const { user } = useAuthUser()
    const { deleteFollowerHandler } = useDeleteFollower()
    return (
        <Layout>
            <FollowerList
                title={'my followers'}
                followers={user?.followers}
                deleteFollowerHandler={deleteFollowerHandler}
            />
        </Layout>
    )
}
