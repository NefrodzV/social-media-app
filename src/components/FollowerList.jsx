import { useRef, useState } from 'react'
import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
import { useImages } from '../hooks'
export default function FollowerList({
    title,
    followers,
    deleteFollowerHandler,
}) {
    const [isEditing, setIsEditing] = useState(false)
    const sectionRef = useRef(null)
    const { penSvg } = useImages()
    return (
        <section
            className="follower-list"
            ref={sectionRef}
            onMouseLeave={() => setIsEditing(false)}
        >
            <h1 className="title">{title}</h1>
            {!isEditing && (
                <button className="edit" onClick={() => setIsEditing(true)}>
                    <img src={penSvg} alt="edit icon" />
                </button>
            )}

            <div className="content">
                {followers?.length === 0 && <div> You have no followers</div>}
                {followers?.map((follower) => (
                    <FollowerItem
                        key={follower._id}
                        follower={follower}
                        deleteFollower={deleteFollowerHandler}
                        isEditing={isEditing}
                    />
                ))}
            </div>
        </section>
    )
}
FollowerList.propTypes = {
    title: PropTypes.string,
    followers: PropTypes.array,
    addFollowerHandler: PropTypes.func,
    deleteFollowerHandler: PropTypes.func,
}
