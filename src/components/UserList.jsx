import PropTypes from 'prop-types'
import UserItem from './UserItem'
export default function UserList({ users, sendRequest }) {
    return (
        <section>
            <h1>Users</h1>
            {!users && <div>No users</div>}
            {users?.map((user) => (
                <UserItem
                    key={user?._id}
                    user={user}
                    sendRequestHandler={sendRequest}
                />
            ))}
        </section>
    )
}

UserList.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array,
    sendRequest: PropTypes.func,
}
