import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useImages } from '../hooks'
export default function FollowerItem({ follower, deleteFollower, isEditing }) {
    const { user } = follower
    const { userSolidSvg } = useImages()
    return (
        <article className="follower">
            <Link
                className="card-link"
                to={`/${user?.fullname}`}
                state={{ id: user?._id }}
            >
                <span className="hidden-text">
                    Go view {user?.fullname || 'follower'} profile
                </span>
            </Link>
            <img
                className="border"
                src={user.imgUrl || userSolidSvg}
                alt="user account image"
            />
            <span className="username">{user?.fullname}</span>
            {isEditing && (
                <button onClick={deleteFollower?.bind('id', follower?._id)}>
                    Remove
                </button>
            )}
        </article>
    )
}
FollowerItem.propTypes = {
    follower: PropTypes.object,
    deleteFollower: PropTypes.func,
    isEditing: PropTypes.bool,
}
