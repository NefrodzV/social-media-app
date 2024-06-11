import { useState } from 'react'
import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
export default function FollowerList({
    title,
    followers,
    addFollowerHandler,
    deleteFollowerHandler,
}) {
    const [editing, setEditing] = useState(false)
    return (
        <section>
            <h1>{title}</h1>
            {followers?.map((user) => (
                <FollowerItem
                    key={user._id}
                    user={user}
                    addFollower={addFollowerHandler}
                    deleteFollower={deleteFollowerHandler}
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
