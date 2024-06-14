import PropTypes from 'prop-types'
export default function UserList({ title, users, sendRequest }) {
    return (
        <section>
            <h1>{title}</h1>
            <ul>
                {users?.map((user) => (
                    <li key={user?._id}>
                        {user?.fullname}
                        <button onClick={sendRequest.bind('id', user?._id)}>
                            send request
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

UserList.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array,
    sendRequest: PropTypes.func,
}
