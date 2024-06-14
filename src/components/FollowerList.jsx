import { useState } from 'react'
import FollowerItem from './FollowerItem'
import PropTypes from 'prop-types'
export default function FollowerList({ followers, deleteFollowerHandler }) {
    return (
        <section>
            <h1>My followers</h1>
            {followers?.map((follower) => (
                <FollowerItem
                    key={follower._id}
                    follower={follower}
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
