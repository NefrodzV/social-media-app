import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useImages } from '../hooks'
import style from '../stylesheets/FollowerItem.module.css'
export default function FollowerItem({ follower, deleteFollower, isEditing }) {
    const { user } = follower
    const { userSolidSvg } = useImages()
    return (
        <article className={style.item}>
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
            <span className={style.username}>{user?.fullname}</span>
            {isEditing && (
                <button
                    className={style.delete}
                    onClick={deleteFollower?.bind('id', follower?._id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="red"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                        />
                    </svg>

                    <span className="hidden-text">Delete</span>
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
