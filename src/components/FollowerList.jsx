import { useRef, useState } from 'react'
import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
export default function FollowerList({ followers, deleteFollowerHandler }) {
    const [isEditing, setIsEditing] = useState(false)
    const sectionRef = useRef(null)

    return (
        <section ref={sectionRef} onMouseLeave={() => setIsEditing(false)}>
            <div>
                <h1>My followers</h1>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>

            {followers.length === 0 && <div> You have no followers</div>}
            {followers?.map((follower) => (
                <FollowerItem
                    key={follower._id}
                    follower={follower}
                    deleteFollower={deleteFollowerHandler}
                    isEditing={isEditing}
                />
            ))}
        </section>
    )
}
FollowerList.propTypes = {
    title: PropTypes.string,
    followers: PropTypes.array,
    addFollowerHandler: PropTypes.func,
    deleteFollowerHandler: PropTypes.func,
}
