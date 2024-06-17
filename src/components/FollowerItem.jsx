import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useImages } from '../hooks'
export default function FollowerItem({ follower, deleteFollower, isEditing }) {
    const { user } = follower
    const { userSolidSvg } = useImages()
    return (
        <article>
            <Link to={`/${user?.fullname}`} state={{ id: user?._id }}>
                Go view follower profile
            </Link>
            <img
                src={user.imgUrl || userSolidSvg}
                alt="user account image"
                style={{
                    width: 50,
                }}
            />
            {user?.fullname}
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
