import PropTypes from 'prop-types'
import UserItem from './UserItem'
import style from '../stylesheets/UserList.module.css'
export default function UserList({ users, sendRequest }) {
    return (
        <section className={style.list}>
            <h1 className={style.title}>Users</h1>
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
