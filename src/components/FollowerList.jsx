import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
export default function FollowerList({ followers, edit, add, remove }) {
    
    return (
        <ul>
            {followers?.map((follower) => (
                <FollowerItem key={follower._id} user={follower} />
            ))}
        </ul>
    )
}
FollowerList.propTypes = {
    followers: PropTypes.array,
}
