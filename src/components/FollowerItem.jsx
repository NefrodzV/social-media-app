import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function FollowerItem({ user, addFollower, deleteFollower }) {
    return (
        <article>
            <Link to={`/${user?.fullname}`}>Go view follower profile </Link>
            {user?.fullname}
            {deleteFollower && <button onClick={deleteFollower}>Remove</button>}
            {addFollower && (
                <button onClick={addFollower.bind('id', user?._id)}>Add</button>
            )}
        </article>
    )
}
FollowerItem.propTypes = {
    user: PropTypes.object,
    addFollower: PropTypes.func,
    deleteFollower: PropTypes.func,
}
