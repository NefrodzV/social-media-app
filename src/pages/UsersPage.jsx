import { Layout, UserList } from '../components'
import { useUsers } from '../hooks'
export default function UsersPage() {
    const { users, status, sendRequest } = useUsers()
    return (
        <Layout>
            <UserList users={users} sendRequest={sendRequest} />
        </Layout>
    )
}
