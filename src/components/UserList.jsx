import PropTypes from 'prop-types'
import UserItem from './UserItem'
export default function UserList({ title, users, sendRequest }) {
    return (
        <section>
            <h1>{title}</h1>
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
