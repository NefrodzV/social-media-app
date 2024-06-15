import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function FollowerItem({ follower, deleteFollower }) {
    const { user } = follower
    return (
        <article>
            <Link to={`/${user?.fullname}`} state={{ id: user?._id }}>
                Go view follower profile
            </Link>
            {user?.fullname}
            {deleteFollower && (
                <button onClick={deleteFollower.bind('id', follower?._id)}>
                    Remove
                </button>
            )}
        </article>
    )
}
FollowerItem.propTypes = {
    user: PropTypes.object,
    addFollower: PropTypes.func,
    deleteFollower: PropTypes.func,
}
